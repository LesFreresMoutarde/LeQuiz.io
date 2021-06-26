<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

#[Route('/categories')]
class CategoryController extends AbstractController
{
    private const POSSIBLE_FILTERS = ['search', 'uuid'];

    #[Route('/', name: 'category_index', methods: ['GET'])]
    public function index(Request $request,
                          EntityManagerInterface $em,
                          PaginatorInterface $paginator,
                          Environment $environment): Response
    {
        $page = 0 !== $request->query->getInt('page') ? $request->query->getInt('page') : 1;

        $params = Util::getParamFromUrl($request, self::POSSIBLE_FILTERS);

        $categories = $this->getFilteredCategories($page, $params, $em, $paginator);

        if ($request->headers->has('X-Requested-With')) {

            $response = new Response();

            $template = $environment->load('category/index.html.twig');

            $response->headers->set('Content-Type', 'text/plain');

            $response->setStatusCode(Response::HTTP_OK);

            $response->setContent($template->renderBlock('categories', ['categories' => $categories]));

            $response->send();
        }

        return $this->render('category/index.html.twig', [
            'categories' => $categories,
        ]);
    }

    #[Route('/new', name: 'category_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($category);
            $entityManager->flush();

            return $this->redirectToRoute('category_index');
        }

        return $this->render('category/new.html.twig', [
            'category' => $category,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'category_show', methods: ['GET'])]
    public function show(Category $category): Response
    {
        return $this->render('category/show.html.twig', [
            'category' => $category,
        ]);
    }

    #[Route('/{id}/edit', name: 'category_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Category $category): Response
    {
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('category_index');
        }

        return $this->render('category/edit.html.twig', [
            'category' => $category,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'category_delete', methods: ['DELETE'])]
    public function delete(Request $request, Category $category): Response
    {
        if ($this->isCsrfTokenValid('delete'.$category->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($category);
            $entityManager->flush();
        }

        return $this->redirectToRoute('category_index');
    }

    private function getFilteredCategories(int $page, array $params, EntityManagerInterface $em, PaginatorInterface $paginator)
    {
        $queryString = 'SELECT c from App\Entity\Category c';
        $whereParts = [];
        $paramsReplacements = [];

        if (!empty($params)) {
            foreach ($params as $paramName => $value) {
                switch ($paramName) {
                    case 'search':
                        $whereParts[] = '(LOWER(c.name) LIKE LOWER(:search) OR LOWER(c.label) LIKE LOWER(:search))';
                        $paramsReplacements['search'] = '%'.$value.'%';
                        break;
                    case 'uuid':
                        if (Util::isUuidValid($value)) {
                            $whereParts[] = 'c.id = :uuid';
                            $paramsReplacements['uuid'] = $value;
                        }
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
