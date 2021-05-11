<?php


namespace App\Twig;


use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class NavbarExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return [
            new TwigFunction('navbar', [$this, 'getNavbar'], ['needs_environment' => true])
        ];
    }

    public function getNavbar(Environment $environment, string $route)
    {
        echo $environment->render('navbar.html.twig', ['route' => $route]);
    }
}
