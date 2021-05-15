<?php


namespace PrivateApi\Responder\Email;


use PrivateApi\Email\Email;
use PrivateApi\Email\EmailContentBuilder;
use PrivateApi\ParamsValidator\ParamsValidator;
use PrivateApi\ParamsValidator\Validator\EmailValidator;
use PrivateApi\ParamsValidator\Validator\RequiredValidator;
use PrivateApi\ParamsValidator\Validator\StringValidator;
use PrivateApi\Responder\ResponderInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class SendWelcomeEmailResponder implements ResponderInterface
{

    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $post = $request->getParsedBody();

        $paramsValidator = new ParamsValidator([
            'username' => [
                RequiredValidator::class,
                StringValidator::class,
            ],
            'email' => [
                RequiredValidator::class,
                StringValidator::class,
                EmailValidator::class,
            ]
        ], $post);

        $paramsValidator->validate();

        if ($paramsValidator->hasErrors()) {
            $response->getBody()->write(json_encode([
                'errors' => $paramsValidator->getErrors()
            ]));

            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(400);
        }

        $username = $post['username'];
        $emailAddress = $post['email'];

        $emailContentBuilder = new EmailContentBuilder();

        $emailContentBuilder
            ->setTemplate('welcome')
            ->setTemplateParams([
                'username' => $username,
            ])
            ->addFooterSection(EmailContentBuilder::FOOTER_SECTION_AUTOMATIC_EMAIL_NO_REPLY);

        $email = new Email();
        $email
            ->setSubject('Bienvenue sur leQuiz.io')
            ->setHtmlContent($emailContentBuilder->getHtmlContent())
            ->setTextContent($emailContentBuilder->getTextContent());

        $email->addTo($emailAddress, $username);
        $email->send();

        return $response; // TODO return clean response
    }
}
