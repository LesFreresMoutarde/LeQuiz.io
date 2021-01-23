<?php


namespace App\Manager;


use App\Repository\CategoryRepository;
use App\Repository\QuestionRepository;
use App\Repository\RefreshTokenRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class TestManager
{
    private $entityManager;
    private $userRepository;
    private $categoryRepository;
    private $questionRepository;
    private $refreshTokenRepository;

    public function __construct
    (
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        CategoryRepository $categoryRepository,
        QuestionRepository $questionRepository,
        RefreshTokenRepository $refreshTokenRepository
    )
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->categoryRepository = $categoryRepository;
        $this->questionRepository = $questionRepository;
        $this->refreshTokenRepository = $refreshTokenRepository;
    }

    public function userTest()
    {
        $users = $this->userRepository->findAll();

        foreach ($users as $user) {
            dump($user);
        }
        //die();
    }

    public function categoryTest()
    {
        $histCat = $this->categoryRepository->findOneBy(['name' => 'Histoire']);

        dump($histCat);

        $histQuest = $histCat->getQuestions();

        foreach ($histQuest as $quest) {
            dump($quest);
        }
    }


    public function questionTest()
    {
        $questions = $this->questionRepository->findAll();

        dump($questions[0]->getCategories()[0]);
    }

    public function refreshTokenTest()
    {
        $refreshTokens = $this->refreshTokenRepository->findAll();

        dump($refreshTokens[0]->getUser());
    }

}
