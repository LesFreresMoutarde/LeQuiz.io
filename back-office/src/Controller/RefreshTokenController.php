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
        return $this->render('refresh_token/index.html.twig', [
            'refresh_tokens' => $refreshTokenRepository->findAll(),
        ]);
    }

    #[Route('/{token}', name: 'refresh_token_show', methods: ['GET'])]
    public function show(RefreshToken $refreshToken): Response
    {
        return $this->render('refresh_token/show.html.twig', [
            'refresh_token' => $refreshToken,
        ]);
    }

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
