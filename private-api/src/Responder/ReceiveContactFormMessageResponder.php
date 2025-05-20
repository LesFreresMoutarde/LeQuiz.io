<?php

namespace PrivateApi\Responder;

use PrivateApi\Email\Email;
use PrivateApi\Email\EmailContentBuilder;
use PrivateApi\Misc\Util;
use PrivateApi\ParamsValidator\ParamsValidator;
use PrivateApi\ParamsValidator\Validator\EmailValidator;
use PrivateApi\ParamsValidator\Validator\MaxLengthValidator;
use PrivateApi\ParamsValidator\Validator\RequiredValidator;
use PrivateApi\ParamsValidator\Validator\StringValidator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ReceiveContactFormMessageResponder implements ResponderInterface
{
    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        return Util::writeJsonResponse($response); // Hibernation

        $post = $request->getParsedBody();

        $paramsValidator = new ParamsValidator([
            'username' => [
                RequiredValidator::class,
                StringValidator::class,
                [MaxLengthValidator::class, 30],
            ],
            'email' => [
                RequiredValidator::class,
                StringValidator::class,
                EmailValidator::class,
            ],
            'subject' => [
                RequiredValidator::class,
                StringValidator::class,
                [MaxLengthValidator::class, 100],
            ],
            'message' => [
                RequiredValidator::class,
                StringValidator::class,
                [MaxLengthValidator::class, 20000],
            ]
        ], $post);

        $paramsValidator->validate();

        if ($paramsValidator->hasErrors()) {
            return Util::writeJsonResponse($response, [
                'errors' => $paramsValidator->getErrors()
            ], 400);
        }

        $username = $post['username'];
        $emailAddress = $post['email'];
        $subject = $post['subject'];
        $message = $post['message'];

        $emailContentBuilder = new EmailContentBuilder();

        $emailContentBuilder
            ->setTemplate('contact-form-message')
            ->setTemplateParams([
                'username' => $username,
                'emailAddress' => $emailAddress,
                'subject' => $subject,
                'message' => $message,
            ]);

        $email = new Email();
        $email
            ->setSubject("Formulaire de contact : $username a envoyé un message : $subject")
            ->setHtmlContent($emailContentBuilder->getHtmlContent())
            ->setTextContent($emailContentBuilder->getTextContent());

        $email->addTo(Email::CONTACT_EMAIL_ADDRESS);
        $email->send();

        return Util::writeJsonResponse($response);
    }
}
