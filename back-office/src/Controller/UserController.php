<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\EditUserType;
use App\Form\UserType;
use App\Util\Enums;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;
use Twig\Environment;

#[Route('/users')]
class UserController extends AbstractController
{
    private const POSSIBLE_FILTERS = ['search', 'uuid', 'plans', 'roles', 'isTrustyWriter', 'isActive', 'isBanned'];

    #[Route('/', name: 'user_index', methods: ['GET'])]
    public function index
    (
        Request $request,
        EntityManagerInterface $em,
        PaginatorInterface $paginator,
        Environment $environment
    ): Response
    {
        $page = 0 !== $request->query->getInt('page') ? $request->query->getInt('page') : 1;

        $params = Util::getParamFromUrl($request, self::POSSIBLE_FILTERS);

        $users = $this->getFilteredUsers($page, $params, $em, $paginator);

        if ($request->headers->has('X-Requested-With')) {

            $response = new Response();

            $template = $environment->load('user/index.html.twig');

            $response->headers->set('Content-Type', 'text/plain');

            $response->setStatusCode(Response::HTTP_OK);

            $response->setContent($template->renderBlock('users', ['users' => $users]));

            $response->send();
        }

        return $this->render('user/index.html.twig', [
            'users' => $users,
            'plans' => Enums::USER_PLANS,
            'roles' => Enums::USER_ROLES,
        ]);
    }

    #[Route('/new', name: 'user_new', methods: ['GET', 'POST'])]
    public function new(Request $request, UserPasswordEncoderInterface $encoder): Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $encodedPassword = $encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($encodedPassword);
            $user->setIsBanned(false);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('user_show', [
                'id' => $user->getId(),
            ]);
        }

        return $this->render('user/new.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/show/{id}', name: 'user_show', methods: ['GET'])]
    public function show(User $user, Security $security): Response
    {
        $form = $this->createForm(EditUserType::class, $user);

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'currentUser' => $security->getUser(),
            'form' => $form->createView(),
            'context' => 'show'
        ]);
    }

    //TODO Password Reset
    #[Route('/edit/{id}', name: 'user_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, User $user, Security $security): Response
    {
        $form = $this->createForm(EditUserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($_POST['unbanDate'] !== '') {
                $user->setUnbanDate(
                    \DateTime::createFromFormat('d-m-Y H:i:s', $_POST['unbanDate'])
                );
            } else {;
                $user->setUnbanDate(null);
            }

            if (!$user->getIsBanned() && $user->getUnbanDate())
                $user->setUnbanDate(null);

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('user_show', [
                'id' => $user->getId(),
            ]);
        }

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'currentUser' => $security->getUser(),
            'form' => $form->createView(),
            'context' => 'edit'
        ]);
    }

    #[Route('/delete/{id}', name: 'user_delete')]
    public function delete(User $user): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user->setIsActive(false);
        $entityManager->flush();

        return $this->redirectToRoute('user_index');
    }

    private function getFilteredUsers(int $page, array $params, EntityManagerInterface $em, PaginatorInterface $paginator)
    {
        $queryString = 'SELECT u from App\Entity\User u';
        $whereParts = [];
        $paramsReplacements = [];

        if (!empty($params)) {
            foreach ($params as $paramName => $value) {
                switch ($paramName) {
                    case 'search':
                        $whereParts[] = '(LOWER(u.username) LIKE LOWER(:search) OR LOWER(u.email) LIKE LOWER(:search))';
                        $paramsReplacements['search'] = '%'.$value.'%';
                        break;
                    case 'uuid':
                        if (Util::isUuidValid($value)) {
                            $whereParts[] = 'u.id = :uuid';
                            $paramsReplacements['uuid'] = $value;
                        }
                        break;
                    case 'plans':
                        $whereParts[] = 'LOWER(u.plan) IN (:plans)';
                        $paramsReplacements['plans'] = explode(',', $value);
                        break;
                    case 'roles':
                        $whereParts[] = 'LOWER(u.role) IN (:roles)';
                        $paramsReplacements['roles'] = explode(',', $value);
                        break;
                    case 'isTrustyWriter':
                        $whereParts[] = 'u.isTrustyWriter = true';
                        break;
                    case 'isActive':
                        $whereParts[] = 'u.isActive = true';
                        break;
                    case 'isBanned':
                        $whereParts[] = 'u.isBanned = true';
                        break;
                }
            }
        }

        $whereString = implode(' AND ', $whereParts);
        $queryString .= !empty($whereString) > 0
            ? ' WHERE '.$whereString
            : '';

        $query = $em->createQuery($queryString);
        $query->setParameters($paramsReplacements);

        return $paginator->paginate($query, $page, 10);
    }
}
