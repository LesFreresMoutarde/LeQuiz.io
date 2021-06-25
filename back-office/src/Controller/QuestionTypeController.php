<?php

namespace App\Controller;

use App\Entity\QuestionType;
use App\Form\QuestionTypeType;
use App\Repository\QuestionTypeRepository;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

#[Route('/question-types')]
class QuestionTypeController extends AbstractController
{
    private const POSSIBLE_FILTERS = ['search', 'uuid', 'isChild'];

    #[Route('/', name: 'question_type_index', methods: ['GET'])]
    public function index( Request $request,
                           EntityManagerInterface $em,
                           PaginatorInterface $paginator,
                           Environment $environment): Response
    {
        $page = 0 !== $request->query->getInt('page') ? $request->query->getInt('page') : 1;

        $params = Util::getParamFromUrl($request, self::POSSIBLE_FILTERS);

        $questionTypes = $this->getFilteredQuestionTypes($page, $params, $em, $paginator);

        if ($request->headers->has('X-Requested-With')) {

            $response = new Response();

            $template = $environment->load('question_type/index.html.twig');

            $response->headers->set('Content-Type', 'text/plain');

            $response->setStatusCode(Response::HTTP_OK);

            $response->setContent($template->renderBlock('questionTypes', ['questionTypes' => $questionTypes]));

            $response->send();
        }

        return $this->render('question_type/index.html.twig', [
            'questionTypes' => $questionTypes,
        ]);
    }

    #[Route('/new', name: 'question_type_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $questionType = new QuestionType();
        $form = $this->createForm(QuestionTypeType::class, $questionType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($questionType);
            $entityManager->flush();

            return $this->redirectToRoute('question_type_index');
        }

        return $this->render('question_type/new.html.twig', [
            'question_type' => $questionType,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'question_type_show', methods: ['GET'])]
    public function show(QuestionType $questionType): Response
    {
        $form = $this->createForm(QuestionTypeType::class, $questionType);

        return $this->render('question_type/edit.html.twig', [
            'questionType' => $questionType,
            'form' => $form->createView(),
            'context'=> 'show'
        ]);
    }

    #[Route('/{id}/edit', name: 'question_type_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, QuestionType $questionType): Response
    {
        $form = $this->createForm(QuestionTypeType::class, $questionType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('question_type_show', [
                'id' => $questionType->getId()
            ]);
        }

        return $this->render('question_type/edit.html.twig', [
            'questionType' => $questionType,
            'form' => $form->createView(),
            'context'=> 'edit'
        ]);
    }

//    #[Route('/{id}', name: 'question_type_delete', methods: ['DELETE'])]
//    public function delete(Request $request, QuestionType $questionType): Response
//    {
//        if ($this->isCsrfTokenValid('delete'.$questionType->getId(), $request->request->get('_token'))) {
//            $entityManager = $this->getDoctrine()->getManager();
//            $entityManager->remove($questionType);
//            $entityManager->flush();
//        }
//
//        return $this->redirectToRoute('question_type_index');
//    }

    private function getFilteredQuestionTypes(int $page, array $params, EntityManagerInterface $em, PaginatorInterface $paginator)
    {
        $queryString = 'SELECT t from App\Entity\QuestionType t';
        $whereParts = [];
        $paramsReplacements = [];

        if (!empty($params)) {
            foreach ($params as $paramName => $value) {
                switch ($paramName) {
                    case 'search':
                        $whereParts[] = '(LOWER(t.name) LIKE LOWER(:search) OR LOWER(t.label) LIKE LOWER(:search))';
                        $paramsReplacements['search'] = '%'.$value.'%';
                        break;
                    case 'uuid':
                        if (Util::isUuidValid($value)) {
                            $whereParts[] = 't.id = :uuid';
                            $paramsReplacements['uuid'] = $value;
                        }
                        break;
                    case 'isChild':
                        $whereParts[] = 't.isChild = true';
                        break;
                }
            }
        }

        $whereString = implode(' AND ', $whereParts);
        $queryString .= !empty($whereString) > 0
            ? ' WHERE '.$whereString
            : '';

        $query = $em->createQuery($queryString);
        $query->setParameters($paramsReplacements);

        return $paginator->paginate($query, $page, 10);
    }
}
