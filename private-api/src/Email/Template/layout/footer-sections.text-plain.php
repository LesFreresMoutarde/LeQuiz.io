<?php

/** @var mixed $footerSection */

use PrivateApi\Email\EmailContentBuilder;

?>
<?= PHP_EOL ?>
<?= PHP_EOL ?>
<?php
if ($footerSection === EmailContentBuilder::FOOTER_SECTION_AUTOMATIC_EMAIL_NO_REPLY) {
    echo <<<EOF
Cet email vous a été envoyé automatiquement, merci de ne pas y répondre. Pour toute demande, vous pouvez nous contacter à contact@lequiz.io.
EOF;
}

if ($footerSection === EmailContentBuilder::FOOTER_SECTION_DID_NOT_REQUESTED_PASSWORD_RESET) {
    echo <<<EOF
Si vous n'êtes pas à l'origine de la demande de réinitialisation de mot de passe, veuillez ignorer cet email.
EOF;
}



