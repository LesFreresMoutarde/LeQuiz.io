<?php


namespace App\Manager;


use App\Entity\Question;
use App\Entity\User;
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
        $user = new User();
        $user->setEmail('dddtoto@makoto.fr');
        $user->setUsername('ddd');
        $user->setPassword('password');
        $user->setIsBanned(false);
        $user->setIsActive(true);
        $user->setIsTrustyWriter(false);
        $user->setRole('member');
        $user->setPlan('free');

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        dd($user);
//        sleep(2);
//        $toto = $this->userRepository->findOneBy(['username' => 'ddd']);
//        $toto->setUsername('UsernameModified');
//        $this->entityManager->flush();
//
//
//        $totoUpdate = $this->userRepository->findOneBy(['username' => 'UsernameModified']);
//        dd($totoUpdate);
//        $users = $this->userRepository->findAll();
//
//        foreach ($users as $user) {
//            dump($user);
//        }
//        //die();
//        echo 'toto';
    }

    public function categoryTest()
    {
        $histCat = $this->categoryRepository->findOneBy(['name' => 'Histoire']);

        dump($histCat);

        $histQuest = $histCat->getQuestions();

        foreach ($histQuest as $quest) {
            dump($quest);
        }
        echo 'fin cat';
    }


    public function questionTest()
    {
        $questions = $this->questionRepository->findAll();

        dump($questions[0]->getCategories()[0]);

        $newQuest = new Question();
        $newQuest->setType('qcm')->setContent('Question a la con')->setStatus('approved')
            ->setAnswer([
                ['content' => "toto", 'is_good_answer' => false],
                ['content' => 'momo', 'is_good_answer' => true]
            ]);

        $this->entityManager->persist($newQuest);
        $this->entityManager->flush();

        dd($newQuest);
    }

    public function refreshTokenTest()
    {
        $refreshTokens = $this->refreshTokenRepository->findAll();

        dump($refreshTokens[0]->getUser());
    }

}
