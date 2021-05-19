<?php

/** @var mixed $footerSection */

use PrivateApi\Email\EmailContentBuilder;

?>

<tr style="border-collapse: collapse;">
    <td style="margin: 0; padding-top: 10px; padding-left: 20px; padding-right: 20px; padding-bottom: 0; font-size: 13px; color: #666">
        <?php
        if ($footerSection === EmailContentBuilder::FOOTER_SECTION_AUTOMATIC_EMAIL_NO_REPLY) {
            ?>
            Cet email vous a été envoyé automatiquement, merci de ne pas y répondre. Pour toute demande, vous pouvez nous contacter à <a href="mailto:contact@lequiz.io" style="color: #666 !important; text-decoration: underline;">contact@lequiz.io</a>.
            <?php
        }

        if ($footerSection === EmailContentBuilder::FOOTER_SECTION_DID_NOT_REQUESTED_PASSWORD_RESET) {
            ?>
            Si vous n'êtes pas à l'origine de la demande de réinitialisation de mot de passe, veuillez ignorer cet email.
            <?php
        }
        ?>
    </td>
</tr>
