<?php

use PrivateApi\PrivateApi;

require '../vendor/autoload.php';

try { // TODO find a better way to catch and display all errors in dev mode ?
    (new PrivateApi())->run();
} catch (Throwable $e) {
    // TODO only in dev mode
    dd($e);
}
