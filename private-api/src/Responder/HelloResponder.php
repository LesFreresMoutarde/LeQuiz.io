<?php


namespace PrivateApi\Responder;


use PrivateApi\Misc\Util;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class HelloResponder implements ResponderInterface
{
    public function respond (ServerRequestInterface $request, ResponseInterface $response, $args)
    {
//        $response->getBody()->write("Hello world!");
//        return $response;

        $response->getBody()->write(Util::renderTemplate(__DIR__ . '/../Email/Template/reset-password.text-plain.php', [
            'username' => 'Toto',
            'resetPasswordUrl' => 'http://example.com/reset',
        ]));
        return $response;
    }
}
