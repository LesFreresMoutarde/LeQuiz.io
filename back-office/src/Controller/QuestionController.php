<?php

namespace App\Controller;

use App\Entity\Question;
use App\Manager\CrudManager;
use App\Util\Enums;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

#[Route('/questions')]
class QuestionController extends AbstractController
{

    private const POSSIBLE_FILTERS = [
        'search', 'uuid', 'categories', 'questionTypes',
        'statuses', 'isHardcore', 'hasMedia', 'tags'
    ];

    #[Route('/', name: 'question_index', methods: ['GET'])]
    public function index(
        Request $request,
        EntityManagerInterface $em,
        PaginatorInterface $paginator,
        Environment $environment,
        CrudManager $crudManager
    ): Response
    {

        $page = 0 !== $request->query->getInt('page') ? $request->query->getInt('page') : 1;

        $params = Util::getParamFromUrl($request, self::POSSIBLE_FILTERS);

        $questions = $this->getFilteredQuestions($page, $params, $em, $paginator);

        $categories = $crudManager->getCategories();
        $questionTypes = $crudManager->getQuestionTypes();
        $tags = $crudManager->getTags();


        if ($request->headers->has('X-Requested-With')) {

            $response = new Response();

            $template = $environment->load('question/index.html.twig');

            $response->headers->set('Content-Type', 'text/plain');

            $response->setStatusCode(Response::HTTP_OK);

            $response->setContent($template->renderBlock('questions', ['questions' => $questions]));

            $response->send();
        }


        return $this->render('question/index.html.twig', [
            'questions' => $questions,
            'categories' => $categories,
            'questionTypes' => $questionTypes,
            'tags' => $tags,
            'statuses' => Enums::STATUSES
        ]);
    }

    #[Route('/new', name: 'question_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CrudManager $crudManager): Response
    {
        $question = new Question();

        $questionTypes = $crudManager->getQuestionTypes();
        $questionStatuses = Enums::STATUSES;
        $categories = $crudManager->getCategories();
        $tags = $crudManager->getTags();
        $answersUniqueId['qcm'] = Util::getRandomIntAsUniqueId(4, 100, 199);
        $answersUniqueId['input'] = Util::getRandomIntAsUniqueId(1, 200, 299);

        try {
            if ($request->getMethod() === 'POST') {

                if (!$submittedToken = $request->request->get('token')) throw new \Exception('Token manquant.');

                if (!$this->isCsrfTokenValid('question_new_token', $submittedToken))
                    throw new \Exception('Token invalide.');

                list($completePickedQuestionTypes,
                    $completePickedCategories, $completePickedTags) = $this->isFormValid($categories, $questionTypes, $tags);

                $answersJson = $this->generateAnswersJson();

                $question = $this->setQuestionValues($question, $completePickedQuestionTypes, $completePickedCategories, $completePickedTags,$answersJson);

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($question);
                $entityManager->flush();

                return $this->redirectToRoute('question_show', [
                    'id' => $question->getId()
                ]);
            }
        } catch (\Exception $e) {
            $this->addFlash('error', $e->getMessage());

            return $this->redirectToRoute('question_new', [
                'id' => $question->getId(),
            ]);
        }

        return $this->render('question/new.html.twig', [
            'question' => $question,
            'questionTypes' => $questionTypes,
            'questionStatuses' => $questionStatuses,
            'categories' => $categories,
            'tags' => $tags,
            'answersUniqueId' => $answersUniqueId
        ]);

    }

    #[Route('/show/{id}', name: 'question_show', methods: ['GET'])]
    public function show(Question $question, CrudManager $crudManager): Response
    {
        $questionTypes = $crudManager->getQuestionTypes();
        $questionStatuses = Enums::STATUSES;
        $categories = $crudManager->getCategories();
        $tags = $crudManager->getTags();
        $answersUniqueId['qcm'] = Util::getRandomIntAsUniqueId(count($question->getAnswer()['answers']['qcm']), 100, 199);
        $answersUniqueId['input'] = Util::getRandomIntAsUniqueId(count($question->getAnswer()['answers']['input']), 200, 299);

        return $this->render('question/edit.html.twig', [
            'question' => $question,
            'questionTypes' => $questionTypes,
            'questionStatuses' => $questionStatuses,
            'categories' => $categories,
            'tags' => $tags,
            'answersUniqueId' => $answersUniqueId,
            'context' => 'show'
        ]);
    }

    //TODO : - QuestionPosition When CustomQuiz Implemented
    //       - JSON FOR MEDIA UPLOADING

    #[Route('/edit/{id}', name: 'question_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Question $question, CrudManager $crudManager): Response
    {
        $questionTypes = $crudManager->getQuestionTypes();
        $questionStatuses = Enums::STATUSES;
        $categories = $crudManager->getCategories();
        $tags = $crudManager->getTags();
        $answersUniqueId['qcm'] = Util::getRandomIntAsUniqueId(count($question->getAnswer()['answers']['qcm']), 100, 199);
        $answersUniqueId['input'] = Util::getRandomIntAsUniqueId(count($question->getAnswer()['answers']['input']), 200, 299);

        try {

            if ($request->getMethod() === 'POST') {

                if (!$submittedToken = $request->request->get('token'))
                    throw new \Exception('Token manquant.');

                if (!$this->isCsrfTokenValid('question_edit_token', $submittedToken))
                    throw new \Exception('Token invalide.');

                list($completePickedQuestionTypes,
                    $completePickedCategories, $completePickedTags) = $this->isFormValid($categories, $questionTypes, $tags);

                $answersJson = $this->generateAnswersJson();

                $question = $this->setQuestionValues
                (
                    $question,
                    $completePickedQuestionTypes,
                    $completePickedCategories,
                    $completePickedTags,
                    $answersJson
                );

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->flush();

                return $this->redirectToRoute('question_show', [
                    'id' => $question->getId()
                ]);
            }
        } catch (\Exception $e) {
            $this->addFlash('error', $e->getMessage());

            return $this->redirectToRoute('question_edit', [
                'id' => $question->getId(),
            ]);
        }

        return $this->render('question/edit.html.twig', [
            'question' => $question,
            'questionTypes' => $questionTypes,
            'questionStatuses' => $questionStatuses,
            'categories' => $categories,
            'tags' => $tags,
            'answersUniqueId' => $answersUniqueId,
            'context' => 'edit'
        ]);

    }

    #[Route('/{id}', name: 'question_delete', methods: ['DELETE'], format: 'json')]
    public function delete(Request $request, Question $question): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($question);
        $entityManager->flush();

        $response = new JsonResponse();
        $response->setStatusCode(Response::HTTP_NO_CONTENT);

        return $response;
    }

    private function getFilteredQuestions(int $page, array $params, EntityManagerInterface $em, PaginatorInterface $paginator)
    {

        $queryString = 'SELECT q from App\Entity\Question q';
        $whereParts = [];
        $joinParts = [];
        $paramsReplacements = [];

        if (!empty($params)) {
            foreach ($params as $paramName => $value) {
                switch ($paramName) {
                    case 'search':
                        $whereParts[] = '(LOWER(q.content) LIKE LOWER(:search) OR LOWER(JSON_GET_TEXT(q.answer, \'answers\'))'.
                        ' LIKE LOWER(:search) OR LOWER(JSON_GET_TEXT(q.answer, \'additional\')) LIKE LOWER(:search))';
                        $paramsReplacements['search'] = '%'.$value.'%';
                        break;
                    case 'uuid':
                        if (Util::isUuidValid($value)) {
                            $whereParts[] = 'q.id = :uuid';
                            $paramsReplacements['uuid'] = $value;
                        }
                        break;
                    case 'categories':
                        $value = explode(',', $value);

                        $joinParts[] = 'JOIN q.categories c WITH';
                        for ($i = 0; $i < count($value); $i++) {

                            if ($i + 1 !== count($value))
                                $joinParts[] = "c.name LIKE LOWER(:category$i) OR";
                            else
                                $joinParts[] =  "c.name LIKE LOWER(:category$i)";

                            $paramsReplacements["category$i"] = '%'.$value[$i].'%';
                        }
                        break;
                    case 'questionTypes':
                        $value = explode(',', $value);
                        $joinParts[] = 'JOIN q.types t WITH';
                        for ($i = 0; $i < count($value); $i++) {

                            if ($i + 1 !== count($value))
                                $joinParts[] = "t.name LIKE LOWER(:type$i) OR";
                            else
                                $joinParts[] =  "t.name LIKE LOWER(:type$i)";

                            $paramsReplacements["type$i"] = '%'.$value[$i].'%';
                        }
                        break;
                    case 'tags':
                        $value = explode(',', $value);
                        $joinParts[] = 'JOIN q.tags tg WITH';
                        for ($i = 0; $i < count($value); $i++) {

                            if ($i + 1 !== count($value))
                                $joinParts[] = "tg.name LIKE LOWER(:tag$i) OR";
                            else
                                $joinParts[] =  "tg.name LIKE LOWER(:tag$i)";

                            $paramsReplacements["tag$i"] = '%'.$value[$i].'%';
                        }
                        break;
                    case 'statuses':
                        $whereParts[] = 'LOWER(q.status) IN (:statuses)';
                        $paramsReplacements['statuses'] = explode(',', $value);
                        break;
                    case 'isHardcore':
                        $whereParts[] = 'q.isHardcore = true';
                        break;
                    case 'hasMedia':
                        $whereParts[] = 'JSON_GET_TEXT(q.media, \'url\') != \'\'';
                        break;
                }
            }

            $whereString = implode(' AND ', $whereParts);
            $joinString = implode(' ', $joinParts);

            $queryString .= !empty($whereString) > 0
                ? ' '.$joinString.' WHERE '.$whereString
                : ' '.$joinString;

        }

        $query = $em->createQuery($queryString);
        $query->setParameters($paramsReplacements);

        return $paginator->paginate($query, $page, 10);
    }

    private function getParamFromUrl(Request $request): array
    {
        $possibleFields = ['search', 'uuid', 'categories', 'questionTypes', 'statuses', 'isHardcore', 'hasMedia'];
        $params = [];

        for ($i = 0; $i < count($possibleFields); $i++) {
            if ($request->query->get($possibleFields[$i]) !== '' && !is_null($request->query->get($possibleFields[$i])))
                 $params[$possibleFields[$i]] = $request->query->get($possibleFields[$i]);
        }

        return $params;
    }

    private function isFormValid(array $allCategories, array $allQuestionTypes, array $allTags)
    {

        $this->hasFormRequiredFields();

        $pickedCategories = [];
        $pickedQuestionTypes = [];
        $pickedTags = [];

        foreach ($_POST as $formInputName => $formInput) {
            if (preg_match('/^cbx-category-/', $formInputName)) {

                $pickedCategories[] = $formInput;

            } else if (preg_match('/^cbx-type-/', $formInputName)) {

                $pickedQuestionTypes[] = $formInput;
            } else if (preg_match('/^cbx-tag-/', $formInputName)) {

                $pickedTags[] = $formInput;
            }
        }

        return $this->hasFormValidValues(
            $allCategories,
            $pickedCategories,
            $allQuestionTypes,
            $pickedQuestionTypes,
            $allTags,
            $pickedTags
        );
    }

    private function hasFormValidValues
    (
        array $allCategories,
        array $pickedCategories,
        array $allQuestionTypes,
        array $pickedQuestionTypes,
        array $allTags,
        array $pickedTags
    ) {

        // Retrieving Question Types Models from user choices
        $completePickedQuestionTypes = [];

        foreach ($allQuestionTypes as $dbQuestionType) {

            foreach ($pickedQuestionTypes as $pickedQuestionType) {

                if ($dbQuestionType->getName() === $pickedQuestionType) {

                    $completePickedQuestionTypes[] = $dbQuestionType;
                }
            }
        }

        // Verify if questions types are valid
        if (count($completePickedQuestionTypes) !== count($pickedQuestionTypes)) {

            throw new \Exception('Type de question invalide.');

        } else if (count($completePickedQuestionTypes) > 1) {
            throw new \Exception('Un seul type de question');
        }

        // Retrieving Category Models from user choices
        $completePickedCategories = [];

        foreach ($allCategories as $dbCategory) {

            foreach ($pickedCategories as $pickedCategory) {

                if ($dbCategory->getName() === $pickedCategory) {

                    $completePickedCategories[] = $dbCategory;
                }
            }
        }

        // Verify if categories are valid
        if (count($completePickedCategories) !== count($pickedCategories)) {

            throw new \Exception('Catégorie invalide.');

        } else if (count($completePickedCategories) > 2) {

            throw new \Exception('Trop de catégories.');
        }

        // Retrieving Tags Models from user choices
        $completePickedTags = [];

        foreach ($allTags as $dbTag) {

            foreach ($pickedTags as $pickedTag) {
                if ($dbTag->getName() === $pickedTag) {
                    $completePickedTags[] = $dbTag;
                }
            }
        }
        // Verify if categories are valid
        if (count($completePickedTags) !== count($pickedTags)) {

            throw new \Exception('Tag invalide.');

        }


        if (!in_array($_POST['question-status'], Enums::STATUSES))
            throw new \Exception('Statut invalide.');

        $answers = [];
        $goodAnswersCount = 0;

        // Push each answers and its value (true or false) into answers array
//        dd($_POST);
        foreach ($_POST as $formInputName => $formInput) {
            if (preg_match('/^answers-content-/', $formInputName)) {

                $answerId = explode('-', $formInputName)[2];
                if (array_key_exists('answers-is_good_answer-'.$answerId, $_POST)) {
//                    throw new \Exception('Réponse invalide.');
                    $answers[Enums::QCM_QUESTION_TYPE][] = $formInput;
                    if ((boolean) $_POST['answers-is_good_answer-'.$answerId]) $goodAnswersCount++;
                    continue;
                }

                $answers[Enums::INPUT_QUESTION_TYPE][] = $formInput;
                //TODO VERIF FACTOR (OU NON)

//                if ($_POST['answers-content-'.$answerId]) {
//
//                    $answers[$formInputName] = $formInput;
//                    if ((boolean) $formInput) $goodAnswersCount++;
//                }
            }
        }
        // Based on the parent question type picked by the user, check if answers array have valid count of answers and
        // goodAnswers
//        switch ($parentQuestionType->getName()) {
            // Only one good answer
//            case Enums::QCM_QUESTION_TYPE:
                if ($goodAnswersCount !== 1 || count($answers[Enums::QCM_QUESTION_TYPE]) !== 4)
                    throw new \Exception('Réponses pour QCM invalides.');
//                break;

            // Only good answers
//            case Enums::INPUT_QUESTION_TYPE:
                if (count($answers[Enums::INPUT_QUESTION_TYPE]) > 15)
                    throw new \Exception("Le nombre de réponses libres est limité à 15");
//                break;

//            default:
//                break;
//        }

        return [$completePickedQuestionTypes, $completePickedCategories, $completePickedTags];
    }

    /**
     * Check if Form has all required fields
     *
     * @throws \Exception
     */
    private function hasFormRequiredFields() {
        define('REQUIRED_FIELDS', array('question-content', 'question-status'));
        define('DYNAMIC_REQUIRED_FIELDS', array('cbx-type', 'cbx-category', 'answers-content', 'answers-is_good_answer', 'answers-error-allowed-count'));
        $dynamicFieldsMatch = [];

        foreach (REQUIRED_FIELDS as $requiredField) {
            if (!array_key_exists($requiredField, $_POST)) throw new \Exception('Formulaire invalide.');
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
            throw new \Exception('Formulaire invalide.');
    }


    private function generateAnswersJson()
    {
        $answers = ['answers' => []];

        foreach ($_POST as $formInputName => $formInput) {

            $parsedFormInput = explode('-', $formInputName);

            if (preg_match('/^answers-content/', $formInputName) && $formInput !== '') {
                $answerId = $parsedFormInput[count($parsedFormInput) - 1];

                if (array_key_exists('answers-is_good_answer-'.$answerId, $_POST)) {
                    $answers['answers']['qcm'][] = ['content' => $formInput, 'is_good_answer' => $_POST['answers-is_good_answer-'.$answerId]];
                    continue;
                }

                if (array_key_exists('answers-error-allowed-count-'.$answerId, $_POST)
                    && (is_numeric($_POST['answers-error-allowed-count-'.$answerId]))
                    && (int) ($_POST['answers-error-allowed-count-'.$answerId]) !== 1
                    && (int) ($_POST['answers-error-allowed-count-'.$answerId]) >= 0)
                {
                    $answers['answers']['input'][] = [
                        'content' => $formInput,
                        'errorAllowedCount' => $_POST['answers-error-allowed-count-'.$answerId]
                    ];
                } else if (array_key_exists('answers-error-allowed-count-'.$answerId, $_POST)) {
                    $answers['answers']['input'][] = ['content' => $formInput];
                }
            }

            if (preg_match('/^additional-/', $formInputName)) {

                list($firstKey, $midKey, $lastKey) = $parsedFormInput;

                if ($formInput !== '') $answers[$firstKey][$midKey][$lastKey] = $formInput;
            }
        }
        return $answers;
    }

    //TODO Media
    private function setQuestionValues(Question $question,
                                       array $pickedQuestionTypes,
                                       array $pickedCategories,
                                       array $pickedTags,
                                       array $answersJson)
    {
        $question->setContent($_POST['question-content']);
        $question->setStatus($_POST['question-status']);
        $question->setAnswer($answersJson);

        if (array_key_exists('is-hardcore', $_POST))
            $question->setIsHardcore(true);
        else
            $question->setIsHardcore(false);

        foreach ($question->getCategories() as $category) {
            $question->removeCategory($category);
        }

        foreach ($question->getTypes() as $type) {
            $question->removeType($type);
        }

        foreach ($question->getTags() as $tag) {
            $question->removeTag($tag);
        }

        foreach ($pickedQuestionTypes as $questionType) {
            $question->addType($questionType);
        }

        foreach ($pickedCategories as $category) {
            $question->addCategory($category);
        }

        foreach ($pickedTags as $tag) {
            $question->addTag($tag);
        }

        return $question;
    }

}
