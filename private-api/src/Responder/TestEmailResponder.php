<?php


namespace PrivateApi\Responder;


use PrivateApi\Email\Email;
use PrivateApi\Email\EmailContentBuilder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class TestEmailResponder implements ResponderInterface
{

    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $emailContentBuilder = new EmailContentBuilder();

        $emailContentBuilder
//            ->setTemplate('reset-password')
            ->setTemplate('welcome')
            ->setTemplateParams([
                'username' => 'Mimile38',
//                'resetPasswordUrl' => 'http://example.com/reset-password',
            ])
//            ->addFooterSection(EmailContentBuilder::FOOTER_SECTION_DID_NOT_REQUESTED_PASSWORD_RESET)
            ->addFooterSection(EmailContentBuilder::FOOTER_SECTION_AUTOMATIC_EMAIL_NO_REPLY);

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
