<?php

/** @var string $username */
/** @var string $resetPasswordUrl */

?>

<table style="border-collapse: collapse; border-spacing: 0px; width: 100%">
    <tbody>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            Bonjour <?= htmlentities($username) ?>,
        </td>
    </tr>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            Pour réinitialiser votre mot de passe leQuiz.io, merci de cliquer sur le bouton ci-dessous.
        </td>
    </tr>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px; text-align: center;" align="center">
            <span class="lequiz-button" style="border-width: 0px; display: inline-block; width:auto">
                <a href="<?= htmlentities($resetPasswordUrl) ?>"
                   style="text-decoration: none; font-size: 18px; color: #ffffff; border-style:solid; border-color: #40D9FF; border-width: 15px 25px 15px 25px; display: inline-block; background-color: #40D9FF; border-radius: 12px; font-weight: normal; font-style:normal; line-height:22px; width:auto; text-align:center"
                   target="_blank">
                    Réinitialiser mon mot de passe
                </a>
            </span>
        </td>
    </tr>
    </tbody>
</table>
