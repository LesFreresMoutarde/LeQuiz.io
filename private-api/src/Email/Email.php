<?php


namespace PrivateApi\Email;


use PHPMailer\PHPMailer\PHPMailer;
use PrivateApi\PrivateApi;

class Email
{
    public const CONTACT_EMAIL_ADDRESS = 'contact@lequiz.io';

    private const FROM_EMAIL_ADDRESS = 'noreply@lequiz.io';
    private const FROM_NAME = 'leQuiz.io';

    private PHPMailer $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);
        $this->mail->isSMTP();
        if (PrivateApi::$static->getConfig()->getEmailSsl()) {
            $this->mail->SMTPAuth = true;
            $this->mail->SMTPSecure = "ssl";
        }
        $this->mail->CharSet = PHPMailer::CHARSET_UTF8;
        $this->mail->Host = PrivateApi::$static->getConfig()->getEmailHost();
        $this->mail->Port = PrivateApi::$static->getConfig()->getEmailPort();
        $this->mail->Username = PrivateApi::$static->getConfig()->getEmailUsername();
        $this->mail->Password = PrivateApi::$static->getConfig()->getEmailPassword();

        $this->mail->addCustomHeader('X-Mailer', 'leQuiz.io');
        $this->mail->setFrom(self::FROM_EMAIL_ADDRESS, self::FROM_NAME);

        $this->mail->isHTML(true);
    }

    public function addTo(string $emailAddress, string $name = ''): self
    {
        $this->mail->addAddress($emailAddress, $name);

        return $this;
    }

    public function send(): bool
    {
        return $this->mail->send();
    }

    public function setHtmlContent(string $htmlContent): self
    {
        $this->mail->Body = $htmlContent;

        return $this;
    }

    public function setSubject(string $subject): self
    {
        $this->mail->Subject = $subject;

        return $this;
    }

    public function setTextContent(string $textContent): self
    {
        $this->mail->AltBody = $textContent;

        return $this;
    }
}
