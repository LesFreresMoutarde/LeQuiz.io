<?php


namespace PrivateApi\Responder\Email;


use PrivateApi\Email\Email;
use PrivateApi\Email\EmailContentBuilder;
use PrivateApi\Responder\ResponderInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class SendWelcomeEmailResponder implements ResponderInterface
{

    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $post = $request->getParsedBody();

        $requiredParams = [
            'username',
            'email',
        ];

        $missingParams = [];

        foreach ($requiredParams as $requiredParam) {
            if (!isset($post[$requiredParam])) {
                $missingParams[] = $requiredParam;
            }
        }

        if (!empty($missingParams)) {
            throw new HttpBadRequestException($request, 'Missing parameters: ' . implode(', ', $missingParams));
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
        try {
            $email->addTo($emailAddress, $username);
            $email->send();
        } catch (\Exception $e) {
            dd($e); // TODO return a clean error
        }

        return $response;
    }
}
