<?php

/** @var string|null $subject */
/** @var string $message */

?>

Un feedback a été envoyé.<?= PHP_EOL ?>
<?= PHP_EOL ?><?php
if (!is_null($subject)) {
    ?>
Sujet : <?= $subject ?><?= PHP_EOL ?>
<?= PHP_EOL ?>
    <?php
}
?>Message:<?= PHP_EOL ?>
<?= PHP_EOL ?>
<?= $message ?>
