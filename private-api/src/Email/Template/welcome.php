<?php

/** @var string $username */

use PrivateApi\PrivateApi;

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
            Bienvenue sur
            <a href="<?= PrivateApi::$static->getConfig()->getFrontUrl() ?>" style="color: #23c5ef; text-decoration: underline;">
                leQuiz.io
            </a>.
        </td>
    </tr>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            La plateforme est en démarrage, soyez patient des nouveautés arrivent prochainement !
        </td>
    </tr>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            N'hésitez pas à nous faire part de vos idées d'amélioration en cliquant sur le bouton "Feedback".
        </td>
    </tr>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            Amusez-vous bien !
        </td>
    </tr>
    </tbody>
</table>
