<?php

/** @var string $username */
/** @var string $emailAddress */
/** @var string $subject */
/** @var string $message */

?>

Un message a été envoyé via le formulaire de contact.<?= PHP_EOL ?>
<?= PHP_EOL ?>
Expéditeur : <?= $username ?> - <?= $emailAddress ?><?= PHP_EOL ?>
<?= PHP_EOL ?>
Sujet : <?= $subject ?><?= PHP_EOL ?>
<?= PHP_EOL ?>
Message:<?= PHP_EOL ?>
<?= PHP_EOL ?>
<?= $message ?>
