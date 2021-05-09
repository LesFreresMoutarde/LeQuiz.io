<?php


namespace PrivateApi\Responder;


use PHPMailer\PHPMailer\PHPMailer;
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

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->Host = PrivateApi::$static->getConfig()->getEmailHost();
        $mail->Port = PrivateApi::$static->getConfig()->getEmailPort();
        $mail->Username = PrivateApi::$static->getConfig()->getEmailUsername();
        $mail->Password = PrivateApi::$static->getConfig()->getEmailPassword();

        $mail->setFrom('example@lequiz.io', 'leQuiz.io');
        $mail->addAddress('user1@example.com', 'User1');

        $mail->isHTML(true);
        $mail->Subject = 'Un email envoyé depuis la private API';
        $mail->Body = $emailContentBuilder->getHtmlContent();
        $mail->AltBody = $emailContentBuilder->getTextContent();

        $mail->send();

        $response->getBody()->write('Email sent');
        return $response;
    }
}
