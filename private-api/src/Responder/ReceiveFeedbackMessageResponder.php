<?php

namespace PrivateApi\Responder;

use PrivateApi\Email\Email;
use PrivateApi\Email\EmailContentBuilder;
use PrivateApi\Misc\Util;
use PrivateApi\ParamsValidator\ParamsValidator;
use PrivateApi\ParamsValidator\Validator\MaxLengthValidator;
use PrivateApi\ParamsValidator\Validator\RequiredValidator;
use PrivateApi\ParamsValidator\Validator\StringValidator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ReceiveFeedbackMessageResponder implements ResponderInterface
{
    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $post = $request->getParsedBody();

        $paramsValidator = new ParamsValidator([
            'subject' => [
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

        $subject = isset($post['subject']) ? $post['subject'] : null;
        $message = $post['message'];

        $emailContentBuilder = new EmailContentBuilder();

        $emailContentBuilder
            ->setTemplate('feedback-message')
            ->setTemplateParams([
                'subject' => $subject,
                'message' => $message,
            ]);

        $email = new Email();
        $email
            ->setSubject(!is_null($subject) ? "Feedback envoyé : $subject" : 'Feedback envoyé')
            ->setHtmlContent($emailContentBuilder->getHtmlContent())
            ->setTextContent($emailContentBuilder->getTextContent());

        $email->addTo(Email::CONTACT_EMAIL_ADDRESS);
        $email->send();

        return Util::writeJsonResponse($response);
    }
}
