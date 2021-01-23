<?php


namespace App\Manager;


use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class TestManager
{
    private $entityManager;
    private $userRepository;

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
    }

    public function userTest()
    {
        $users = $this->userRepository->findAll();
        dd($users);
    }


}
