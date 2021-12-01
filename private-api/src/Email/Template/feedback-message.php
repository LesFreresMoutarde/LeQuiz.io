<?php

/** @var string|null $subject */
/** @var string $message */

?>

<table style="border-collapse: collapse; border-spacing: 0px; width: 100%">
    <tbody>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            Un feedback a été envoyé.
        </td>
    </tr>
    <?php
    if (!is_null($subject)) {
        ?>
        <tr style="border-collapse: collapse;">
            <td style="margin: 0; padding: 0; padding-bottom: 20px;">
                Sujet : <strong><?= htmlentities($subject) ?></strong>
            </td>
        </tr>
        <?php
    }
    ?>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0; padding-bottom: 20px;">
            Message :
        </td>
    </tr>
    <tr style="border-collapse: collapse;">
        <td style="margin: 0; padding: 0;">
            <q>
                <?= nl2br(htmlentities($message)) ?>
            </q>
        </td>
    </tr>
    </tbody>
</table>
