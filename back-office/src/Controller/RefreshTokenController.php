<?php

namespace App\Controller;

use App\Entity\RefreshToken;
use App\Form\RefreshTokenType;
use App\Repository\RefreshTokenRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/refresh-token')]
class RefreshTokenController extends AbstractController
{
    #[Route('/', name: 'refresh_token_index', methods: ['GET'])]
    public function index(RefreshTokenRepository $refreshTokenRepository): Response
    {
        $refreshTokens = $refreshTokenRepository->findAll();

        foreach ($refreshTokens as $token) {
//            $token->setToken()
        }

//        dd($refreshTokens);

        return $this->render('refresh_token/index.html.twig', [
            'refresh_tokens' => $refreshTokenRepository->findAll(),
        ]);
    }

//    #[Route('/new', name: 'refresh_token_new', methods: ['GET', 'POST'])]
//    public function new(Request $request): Response
//    {
//        $refreshToken = new RefreshToken();
//        $form = $this->createForm(RefreshTokenType::class, $refreshToken);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $entityManager = $this->getDoctrine()->getManager();
//            $entityManager->persist($refreshToken);
//            $entityManager->flush();
//
//            return $this->redirectToRoute('refresh_token_index');
//        }
//
//        return $this->render('refresh_token/new.html.twig', [
//            'refresh_token' => $refreshToken,
//            'form' => $form->createView(),
//        ]);
//    }
//
    #[Route('/{token}', name: 'refresh_token_show', methods: ['GET'])]
    public function show(RefreshToken $refreshToken): Response
    {
        return $this->render('refresh_token/show.html.twig', [
            'refresh_token' => $refreshToken,
        ]);
    }

//    #[Route('/{token}/edit', name: 'refresh_token_edit', methods: ['GET', 'POST'])]
//    public function edit(Request $request, RefreshToken $refreshToken): Response
//    {
//        $form = $this->createForm(RefreshTokenType::class, $refreshToken);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $this->getDoctrine()->getManager()->flush();
//
//            return $this->redirectToRoute('refresh_token_index');
//        }
//
//        return $this->render('refresh_token/edit.html.twig', [
//            'refresh_token' => $refreshToken,
//            'form' => $form->createView(),
//        ]);
//    }

    #[Route('/{token}', name: 'refresh_token_delete', methods: ['DELETE'])]
    public function delete(Request $request, RefreshToken $refreshToken): Response
    {
        if ($this->isCsrfTokenValid('delete'.$refreshToken->getToken(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($refreshToken);
            $entityManager->flush();
        }

        return $this->redirectToRoute('refresh_token_index');
    }
}
