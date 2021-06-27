<?php

namespace App\Controller;

use App\Entity\RefreshToken;
use App\Form\RefreshTokenType;
use App\Manager\CrudManager;
use App\Repository\RefreshTokenRepository;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

#[Route('/refresh-tokens')]
class RefreshTokenController extends AbstractController
{
    private const POSSIBLE_FILTERS = ['search'];

    #[Route('/', name: 'refresh_token_index', methods: ['GET'])]
    public function index(
        Request $request,
        EntityManagerInterface $em,
        PaginatorInterface $paginator,
        Environment $environment,
    ): Response
    {
        $page = 0 !== $request->query->getInt('page') ? $request->query->getInt('page') : 1;

        $params = Util::getParamFromUrl($request, self::POSSIBLE_FILTERS);

        $refreshTokens = $this->getFilteredRefreshTokens($page, $params, $em, $paginator);

        if ($request->headers->has('X-Requested-With')) {

            $response = new Response();

            $template = $environment->load('refresh_token/index.html.twig');

            $response->headers->set('Content-Type', 'text/plain');

            $response->setStatusCode(Response::HTTP_OK);

            $response->setContent($template->renderBlock('refreshTokens', ['refreshTokens' => $refreshTokens]));

            $response->send();
        }

        return $this->render('refresh_token/index.html.twig', [
            'refreshTokens' => $refreshTokens,
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

    private function getFilteredRefreshTokens(int $page, array $params, EntityManagerInterface $em, PaginatorInterface $paginator)
    {
        $queryString = 'SELECT r from App\Entity\RefreshToken r';
        $joinParts = [];
        $paramsReplacements = [];

        if (!empty($params)) {
            foreach ($params as $paramName => $value) {
                switch ($paramName) {
                    case 'search':
                        $joinParts[] = 'JOIN r.user u WITH u.username LIKE LOWER(:search)';
                        $paramsReplacements['search'] = '%'.$value.'%';
                        break;
                }
            }
        }

        $joinString = implode(' ', $joinParts);
        $queryString .= !empty($joinString) > 0
            ? ' '.$joinString
            : '';

        $query = $em->createQuery($queryString);
        $query->setParameters($paramsReplacements);
        return $paginator->paginate($query, $page, 10);
    }
}
