<?php

/** @var string $username */

use PrivateApi\PrivateApi;

?>

<table style="border-collapse: collapse; border-spacing: 0px; width: 100%">
    <tbody>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            Bonjour <?= $username ?>,
        </td>
    </tr>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            Vous venez de vous inscrire sur
            <a href="<?= PrivateApi::$static->getConfig()->getFrontUrl() ?>" style="color: #23c5ef; text-decoration: underline;">
                leQuiz.io
            </a>. Bienvenue !
        </td>
    </tr>
    </tbody>
</table>
