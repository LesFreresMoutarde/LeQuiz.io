<?php

namespace App\Controller;

use App\Manager\TestManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{

    private $testManager;

    public function __construct(TestManager $testManager)
    {
        $this->testManager = $testManager;
    }

    /**
     * @Route("/", name="home")
     * @return Response

     */
    public function index(): Response
    {

//        $this->testManager->userTest();
//        $this->testManager->categoryTest();
//        $this->testManager->questionTest();
//        $this->testManager->refreshTokenTest();

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

}
