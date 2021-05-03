<?php


namespace PrivateApi\Responder;


use PHPMailer\PHPMailer\PHPMailer;
use PrivateApi\PrivateApi;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class TestEmailResponder implements ResponderInterface
{

    public function respond(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
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
        $mail->Body = 'Du contenu <b>En HTML</b> âvèc dés àcçënts';
        $mail->AltBody = 'Du contenu en texte âvèc dés àcçënts';

        $mail->send();

        $response->getBody()->write("Email sent!");
        return $response;
    }
}
