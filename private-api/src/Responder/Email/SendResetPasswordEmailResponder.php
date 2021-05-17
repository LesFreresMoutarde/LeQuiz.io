<?php


namespace PrivateApi\Responder\Email;


use PrivateApi\Email\Email;
use PrivateApi\Email\EmailContentBuilder;
use PrivateApi\Misc\Util;
use PrivateApi\ParamsValidator\ParamsValidator;
use PrivateApi\ParamsValidator\Validator\EmailValidator;
use PrivateApi\ParamsValidator\Validator\MaxLengthValidator;
use PrivateApi\ParamsValidator\Validator\RequiredValidator;
use PrivateApi\ParamsValidator\Validator\StringValidator;
use PrivateApi\ParamsValidator\Validator\UrlValidator;
use PrivateApi\Responder\ResponderInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class SendResetPasswordEmailResponder implements ResponderInterface
{
    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
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
            'resetPasswordUrl' => [
                RequiredValidator::class,
                StringValidator::class,
                [UrlValidator::class, ['http', 'https']],
            ],
        ], $post);

        $paramsValidator->validate();

        if ($paramsValidator->hasErrors()) {
            return Util::getJsonResponse($response, [
                'errors' => $paramsValidator->getErrors()
            ], 400);
        }

        $username = $post['username'];
        $emailAddress = $post['email'];
        $resetPasswordUrl = $post['resetPasswordUrl'];

        $emailContentBuilder = new EmailContentBuilder();

        $emailContentBuilder
            ->setTemplate('reset-password')
            ->setTemplateParams([
                'username' => $username,
                'resetPasswordUrl' => $resetPasswordUrl,
            ])
            ->addFooterSection(EmailContentBuilder::FOOTER_SECTION_DID_NOT_REQUESTED_PASSWORD_RESET)
            ->addFooterSection(EmailContentBuilder::FOOTER_SECTION_AUTOMATIC_EMAIL_NO_REPLY);

        $email = new Email();
        $email
            ->setSubject('Réinitialisez votre mot de passe leQuiz.io')
            ->setHtmlContent($emailContentBuilder->getHtmlContent())
            ->setTextContent($emailContentBuilder->getTextContent());

        $email->addTo($emailAddress, $username);
        $email->send();

        return Util::getJsonResponse($response);
    }
}
