<?php

namespace App\Controller;

use App\Entity\Question;
use App\Manager\CrudManager;
use App\Repository\QuestionRepository;
use App\Repository\QuestionTypeRepository;
use App\Util\Enums;
use ContainerL1zqxd7\getConsole_ErrorListenerService;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

#[Route('/questions')]
class QuestionController extends AbstractController
{
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

        $params = $this->getParamFromUrl($request);
//        dd($params);

        $questions = $this->getFilteredQuestions($page, $params, $em, $paginator);

        $categories = $crudManager->getCategories();
        $questionTypes = $crudManager->getQuestionTypes();


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
            'statuses' => Enums::STATUSES
        ]);
    }

    #[Route('/new', name: 'question_new', methods: ['GET', 'POST'])]
    public function new(Request $request,
                        CategoryRepository $categoryRepository,
                        QuestionTypeRepository $questionTypeRepository): Response
    {
        $question = new Question();

        $questionTypes = $questionTypeRepository->findAll();
        $questionDifficulty = Enums::QUESTION_DIFFICULTY;
        $questionStatuses = Enums::STATUSES;
        $categories = $categoryRepository->findAll();

        if ($request->getMethod() === 'POST') {

            if (!$submittedToken = $request->request->get('token')) throw new \Exception('Missing token');

            if (!$this->isCsrfTokenValid('question_new_token', $submittedToken)) throw new \Exception('Invalid token');

            list($completePickedQuestionTypes,
                $completePickedCategories) = $this->isFormValid($categories, $questionTypes);

            $answersJson = $this->generateAnswersJson();

            $question = $this->setQuestionValues($question, $completePickedQuestionTypes, $completePickedCategories, $answersJson);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($question);
            $entityManager->flush();

            return $this->redirectToRoute('question_show', [
                'id' => $question->getId()
            ]);
        }

        return $this->render('question/new.html.twig', [
            'question' => $question,
            'questionTypes' => $questionTypes,
            'questionDifficulty' => $questionDifficulty,
            'questionStatuses' => $questionStatuses,
            'categories' => $categories
        ]);

    }

    #[Route('/show/{id}', name: 'question_show', methods: ['GET'])]
    public function show(Question $question): Response
    {
        return $this->render('question/show.html.twig', [
            'question' => $question,
        ]);
    }

    //TODO : - QuestionPosition When CustomQuiz Implemented
    //       - JSON FOR MEDIA UPLOADING
    //       - Try/Catch Handling when toastr Ready

    #[Route('/edit/{id}', name: 'question_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request,
                         Question $question,
                         CategoryRepository $categoryRepository,
                         QuestionTypeRepository $questionTypeRepository): Response
    {
        $questionTypes = $questionTypeRepository->findAll();
        $questionDifficulty = Enums::QUESTION_DIFFICULTY;
        $questionStatuses = Enums::STATUSES;
        $categories = $categoryRepository->findAll();

//TODO
//        try {

            if ($request->getMethod() === 'POST') {

                if (!$submittedToken = $request->request->get('token')) throw new \Exception('Missing token');

                if (!$this->isCsrfTokenValid('question_edit_token', $submittedToken)) throw new \Exception('Invalid token');

                list($completePickedQuestionTypes,
                    $completePickedCategories) = $this->isFormValid($categories, $questionTypes);

                $answersJson = $this->generateAnswersJson();

                $question = $this->setQuestionValues($question, $completePickedQuestionTypes, $completePickedCategories, $answersJson);

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->flush();

                return $this->redirectToRoute('question_show', [
                    'id' => $question->getId()
                ]);
            }

            return $this->render('question/edit.html.twig', [
                'question' => $question,
                'questionTypes' => $questionTypes,
                'questionDifficulty' => $questionDifficulty,
                'questionStatuses' => $questionStatuses,
                'categories' => $categories
            ]);
//        } catch (\Exception $e) {

//             return($e);
//        }
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

    private function getFilteredQuestions(int $page, array $params, EntityManagerInterface $em, PaginatorInterface $paginator)
    {
        // id, content, answer->>answers answer->>additional,
        // isHardcore
        // Faire une concaténation des params
//        dd(empty($params));
        $queryString = 'SELECT q from App\Entity\Question q';
        $whereParts = [];
        $joinParts = [];
        $paramsReplacements = [];

        if (!empty($params)) {
            foreach ($params as $paramName => $value) {
                switch ($paramName) {
                    case 'search':
                        $whereParts[] = 'LOWER(q.content) LIKE LOWER(:search) OR LOWER(JSON_GET_TEXT(q.answer, \'answers\'))'.
                        ' LIKE LOWER(:search) OR LOWER(JSON_GET_TEXT(q.answer, \'additional\')) LIKE LOWER(:search)';
                        $paramsReplacements['search'] = '%'.$value.'%';
                        break;
                    case 'uuid':
                        $whereParts[] = 'q.id = :uuid';
                        $paramsReplacements['uuid'] = $value;
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

//        dump($queryString);
//        dd($paramsReplacements);
        $query = $em->createQuery($queryString);
        $query->setParameters($paramsReplacements);

//        dd($query->getResult());
//        dd($paginator->paginate($query, $page, 10));
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

    private function isFormValid(array $allCategories, array $allQuestionTypes)
    {

        $this->hasFormRequiredFields();

        $pickedCategories = [];
        $pickedQuestionTypes = [];

        foreach ($_POST as $formInputName => $formInput) {
            if (preg_match('/^cbx-category-/', $formInputName)) {

                $pickedCategories[] = $formInput;

            } else if (preg_match('/^cbx-type-/', $formInputName)) {

                $pickedQuestionTypes[] = $formInput;
            }
        }

        return $this->hasFormValidValues($allCategories, $pickedCategories, $allQuestionTypes, $pickedQuestionTypes);
    }

    private function hasFormValidValues(array $allCategories,
                                        array $pickedCategories,
                                        array $allQuestionTypes,
                                        array $pickedQuestionTypes)
    {

        // Retrieving Question Types Models from user choices
        $completePickedQuestionTypes = [];

        foreach ($allQuestionTypes as $dbQuestionType) {

            foreach ($pickedQuestionTypes as $pickedQuestionType) {

                if ($dbQuestionType->getName() === $pickedQuestionType) {

                    $completePickedQuestionTypes[] = $dbQuestionType;
                }
            }
        }

        $parentQuestionType = null;

        // Verify if questions types are valid
        if (count($completePickedQuestionTypes) !== count($pickedQuestionTypes)) {

            throw new \Exception('Invalid question type');

        } else if (count($completePickedQuestionTypes) === 1) {

            $parentQuestionType = $completePickedQuestionTypes[0];

            if ($completePickedQuestionTypes[0]->getIsChild()) throw new \Exception('A child type cannot be alone');

        } else if (count($completePickedQuestionTypes) === 2) {

            $isParentPresent = false;
            $isChildPresent = false;

            foreach ($completePickedQuestionTypes as $completePickedQuestionType) {

                if ($completePickedQuestionType->getIsChild())  {
                    $isChildPresent = true;
                }
                else {
                    $parentQuestionType = $completePickedQuestionType;
                    $isParentPresent = true;
                }
            }

            if (!$isParentPresent || !$isChildPresent) throw new \Exception('Invalid question types combination');

        } else {

            throw new \Exception('Too many question types');
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

            throw new \Exception('Invalid category');

        } else if (count($completePickedCategories) > 2) {

            throw new \Exception('Too many categories');
        }

        if (!in_array($_POST['question-status'], Enums::STATUSES))
            throw new \Exception('Invalid status');

        if (!in_array($_POST['question-difficulty'], Enums::QUESTION_DIFFICULTY))
            throw new \Exception('Invalid difficulty');


        $answers = [];
        $goodAnswersCount = 0;

        // Push each answers and its value (true or false) into answers array
        foreach ($_POST as $formInputName => $formInput) {
            if (preg_match('/^answers-is_good_answer-/', $formInputName)) {

                $answerId = explode('-', $formInputName)[2];
                if(!array_key_exists('answers-content-'.$answerId, $_POST)) throw new \Exception('Invalid Answer');

                if ($_POST['answers-content-'.$answerId]) {

                    $answers[$formInputName] = $formInput;
                    if ((boolean) $formInput) $goodAnswersCount++;
                }
            }
        }

        // Based on the parent question type picked by the user, check if answers array have valid count of answers and
        // goodAnswers
        switch ($parentQuestionType->getName()) {
            // Only one good answer
            case Enums::QCM_QUESTION_TYPE:
                if ($goodAnswersCount !== 1 || count($answers) !== 4) throw new \Exception('QCM Invalid Answers');
                break;

            // Only good answers
            case Enums::INPUT_QUESTION_TYPE:
                if ($goodAnswersCount !== count($answers)) throw new \Exception("Input Invalid Answers");
                break;

            default:
                break;
        }

        return [$completePickedQuestionTypes, $completePickedCategories];
    }

    /**
     * Check if Form has all required fields
     *
     * @throws \Exception
     */
    private function hasFormRequiredFields() {
        define('REQUIRED_FIELDS', array('question-content', 'question-difficulty', 'question-status'));
        define('DYNAMIC_REQUIRED_FIELDS', array('cbx-type', 'cbx-category', 'answers-content', 'answers-is_good_answer'));
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


    private function generateAnswersJson()
    {
        $answers = ['answers' => []];

        foreach ($_POST as $formInputName => $formInput) {

            $parsedFormInput = explode('-', $formInputName);

            if (preg_match('/^answers-content/', $formInputName)) {

                foreach ($answers['answers'] as $answer) {
                    if ($answer['content'] === $formInput) throw new \Exception('Value not unique');
                }

                $answerId = $parsedFormInput[count($parsedFormInput) - 1];

                if ($formInput !== '')  {

                    $answers['answers'][] = [
                        'content' => $formInput,
                        'is_good_answer' => (boolean) $_POST['answers-is_good_answer-'.$answerId]
                    ];
                }
            }

            if (preg_match('/^additional-/', $formInputName)) {

                //TODO Corriger fistKey par firstKey
                list($fistKey, $midKey, $lastKey) = $parsedFormInput;

                //TODO Corriger fistKey par firstKey
                if ($formInput !== '') $answers[$fistKey][$midKey][$lastKey] = $formInput;
            }
        }

        return $answers;
    }

    //TODO Media
    private function setQuestionValues(Question $question,
                                       array $pickedQuestionTypes,
                                       array $pickedCategories,
                                       array $answersJson)
    {
        $question->setContent($_POST['question-content']);
        $question->setDifficulty($_POST['question-difficulty']);
        $question->setStatus($_POST['question-status']);
        $question->setAnswer($answersJson);

        foreach ($question->getCategories() as $category) {
            $question->removeCategory($category);
        }

        foreach ($question->getTypes() as $type) {
            $question->removeType($type);
        }

        foreach ($pickedQuestionTypes as $questionType) {
            $question->addType($questionType);
        }

        foreach ($pickedCategories as $category) {
            $question->addCategory($category);
        }

        return $question;

    }

}
