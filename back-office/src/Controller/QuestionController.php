<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Question;
use App\Form\QuestionType;
use App\Repository\CategoryRepository;
use App\Repository\QuestionRepository;
use App\Util\Enums;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/question')]
class QuestionController extends AbstractController
{
    #[Route('/', name: 'question_index', methods: ['GET'])]
    public function index(QuestionRepository $questionRepository): Response
    {
        return $this->render('question/index.html.twig', [
            'questions' => $questionRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'question_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $question = new Question();
        $form = $this->createForm(QuestionType::class, $question);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($question);
            $entityManager->flush();

            return $this->redirectToRoute('question_index');
        }

        return $this->render('question/new.html.twig', [
            'question' => $question,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'question_show', methods: ['GET'])]
    public function show(Question $question): Response
    {
        return $this->render('question/show.html.twig', [
            'question' => $question,
        ]);
    }

    #[Route('/{id}/edit', name: 'question_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Question $question, CategoryRepository $categoryRepository): Response
    {
       //Form  = type, difficulty, content, answer, status, media
        // Lors de la validation, vérifier les types des values de l'user
        // Verifier si les valeurs sont correctes
        // Verifier si la valeur est acceptable (une quest ayant plusieurs props, ne peut etre input)

        //Recupérer les types
        $questionTypes = Enums::QUESTION_TYPES;
        $questionDifficulty = Enums::QUESTION_DIFFICULTY;
        $questionStatuses = Enums::STATUSES;
        $categories = $categoryRepository->findAll();
        $token = random_bytes(16);

        if ($request->getMethod() === 'POST') {
//            dd($_POST);
            if (!$submittedToken = $request->request->get('token')) throw new \Exception('Missing token');

            if (!$this->isCsrfTokenValid('question_edit', $submittedToken)) throw new \Exception('Invalid token');

            $this->isFormValid($request->request);
            // verifier si tous les champs sont présens

            //return $this->redirectToRoute('question_index');
        }
//        dd($question);
        return $this->render('question/edit.html.twig', [
            'question' => $question,
            'questionTypes' => $questionTypes,
            'questionDifficulty' => $questionDifficulty,
            'questionStatuses' => $questionStatuses,
            'categories' => $categories,
            'token' => $token
        ]);
    }

    #[Route('/{id}', name: 'question_delete', methods: ['DELETE'])]
    public function delete(Request $request, Question $question): Response
    {
        if ($this->isCsrfTokenValid('delete'.$question->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($question);
            $entityManager->flush();
        }

        return $this->redirectToRoute('question_index');
    }

    private function isFormValid($formData) {
        $this->hasFormRequiredFields();
    }

    /**
     * Check if Form has all required fields
     *
     * @throws \Exception
     */
    private function hasFormRequiredFields() {
        define('REQUIRED_FIELDS', array('question-content', 'question-type', 'question-status'));
        define('DYNAMIC_REQUIRED_FIELDS', array('cbx', 'answer', 'bool-answer'));
        $dynamicFieldsMatch = [];
        foreach (REQUIRED_FIELDS as $requiredField) {
            if (!array_key_exists($requiredField, $_POST)) throw new \Exception('Invalid Form');
        }

        for ($i = 0 ; $i < count(DYNAMIC_REQUIRED_FIELDS) ; $i++) {
            foreach ($_POST as $formInputName => $formInput) {
                    if (preg_match('/^'.DYNAMIC_REQUIRED_FIELDS[$i].'/', $formInputName)) {
                        array_push( $dynamicFieldsMatch, DYNAMIC_REQUIRED_FIELDS[$i]);
                        continue 2;
                    }
            }
        }
        if (count($dynamicFieldsMatch) !== count(DYNAMIC_REQUIRED_FIELDS)) throw new \Exception('Dynamic');
    }
}
