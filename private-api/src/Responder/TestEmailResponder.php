<?php


namespace PrivateApi\Responder;


use PHPMailer\PHPMailer\PHPMailer;
use PrivateApi\Email\Email;
use PrivateApi\Email\EmailContentBuilder;
use PrivateApi\PrivateApi;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class TestEmailResponder implements ResponderInterface
{

    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $emailContentBuilder = new EmailContentBuilder();

        $emailContentBuilder
            ->setTemplate('reset-password')
            ->setTemplateParams([
                'username' => 'Mimile38',
                'resetPasswordUrl' => 'http://example.com/reset-password',
            ]);

        $email = new Email();
        $email->setSubject('Réinitialisez votre mot de passe leQuiz.io')
            ->addTo('user1@lequiz.io', 'User1')
            ->setHtmlContent($emailContentBuilder->getHtmlContent())
            ->setTextContent($emailContentBuilder->getTextContent())
            ->send();

        $response->getBody()->write('Email sent');
        return $response;
    }
}
