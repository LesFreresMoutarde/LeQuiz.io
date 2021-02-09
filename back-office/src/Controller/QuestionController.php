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
        // Verifier si la valeur est acceptable (une quest ayant plusieurs props, ne peut etre input) Bah si justement

        //Recupérer les types
        $questionTypes = Enums::QUESTION_TYPES;
        $questionDifficulty = Enums::QUESTION_DIFFICULTY;
        $questionStatuses = Enums::STATUSES;
        $categories = $categoryRepository->findAll();

        if ($request->getMethod() === 'POST') {
//            dd($_POST);
            if (!$submittedToken = $request->request->get('token')) throw new \Exception('Missing token');

            if (!$this->isCsrfTokenValid('question_edit_token', $submittedToken)) throw new \Exception('Invalid token');

            $this->isFormValid($request->request, $categories);

//            dd($_POST);
            // Construire les 2 json (answers et
            //TODO JSON FOR MEDIA UPLOADING
            $this->generateJson();

//            $answersJson = $this->generateJsonFromForm($_POST, ['answers', 'additional'], ['answers-content-*' => 'answers-is_good_answer-*']);


            //return $this->redirectToRoute('question_index');
        }
       // dd($question);
        return $this->render('question/edit.html.twig', [
            'question' => $question,
            'questionTypes' => $questionTypes,
            'questionDifficulty' => $questionDifficulty,
            'questionStatuses' => $questionStatuses,
            'categories' => $categories
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


    private function hasMultipleFields(string $formInput)
    {
        $parsedFormInput = explode('-',$formInput);

        return is_numeric($parsedFormInput[count($parsedFormInput) - 1]);
    }

    private function generateAnswersJson() {
        $answers = ['answers' => []];

        foreach ($_POST as $formInputName => $formInput) {

            $parsedFormInput = explode('-', $formInputName);

            if (preg_match('/^answers-content/', $formInputName)) {

                foreach ($answers['answers'] as $answer) {
                    if ($answer['content'] === $formInput) throw new \Exception('Value not unique');
                }

//                $parsedFormInput = explode('-', $formInputName);

                $answerId = $parsedFormInput[count($parsedFormInput) - 1];

                $answers['answers'][] = [
                    'content' => $formInput,
                    'is_good_answer' => (boolean) $_POST['answers-is_good_answer-'.$answerId]
                ];
            }

            if (preg_match('/^additional-/', $formInputName)) {

                list($fistKey, $midKey, $lastKey) = $parsedFormInput;

                if ($formInput) $answers[$fistKey][$midKey][$lastKey] = $formInput;
            }
        }

//        dd(count($answers['additional'])); // ,Si additionnal = 0, le degagez
        dump($answers);
        dd(json_encode($answers));
    }



    private function isFormValid($formData, array $allCategories) {
        $this->hasFormRequiredFields();

        $pickedCategories = [];
        foreach ($_POST as $formInputName => $formInput) {
            if (preg_match('/^cbx-/', $formInputName)) {
                $pickedCategories[] = explode('-', $formInputName)[1];
            }
        }

        $this->hasFormValidValues($allCategories, $pickedCategories);
    }

    private function hasFormValidValues(array $allCategories, array $pickedCategories) {

        if (!in_array($_POST['question-type'], Enums::QUESTION_TYPES))
            throw new \Exception('Invalid type');

        if (!in_array($_POST['question-status'], Enums::STATUSES))
            throw new \Exception('Invalid status');

        if (!in_array($_POST['question-difficulty'], Enums::QUESTION_DIFFICULTY))
            throw new \Exception('Invalid difficulty');

        foreach ($pickedCategories as $category) {
            if (!in_array($category, $allCategories)) throw new \Exception('Invalid category');
        }

        $answers = [];
        $goodAnswersCount = 0;
        foreach ($_POST as $formInputName => $formInput) {
            if (preg_match('/^answers-is_good_answer-/', $formInputName)) {

                $answerId = explode('-', $formInputName)[2];
                if(!array_key_exists('answers-content-'.$answerId, $_POST)) throw new \Exception('Invalid Answer');

                $answers[$formInputName] = $formInput;
                if ((boolean) $formInput) $goodAnswersCount++;
            }
        }

        switch ($_POST['question-type']) {
            // Only one good answer
            case Enums::QCM_QUESTION_TYPE:
                if ($goodAnswersCount !== 1 || count($answers) !== 4) throw new \Exception('QCM Invalid Answer');
                break;

            // Only good answers
            case Enums::INPUT_QUESTION_TYPE:
                if ($goodAnswersCount !== count($answers)) throw new \Exception("Input Invalid Answer");
                break;

            default:
                break;
        }
    }

    /**
     * Check if Form has all required fields
     *
     * @throws \Exception
     */
    private function hasFormRequiredFields() {
        define('REQUIRED_FIELDS', array('question-content', 'question-type', 'question-difficulty', 'question-status'));
        define('DYNAMIC_REQUIRED_FIELDS', array('cbx', 'answers-content', 'answers-is_good_answer'));
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

        if (count($dynamicFieldsMatch) !== count(DYNAMIC_REQUIRED_FIELDS))
            throw new \Exception('Invalid Form');
    }
}
