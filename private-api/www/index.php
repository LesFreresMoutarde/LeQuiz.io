<?php

use PrivateApi\PrivateApi;

require '../vendor/autoload.php';

try { // TODO find a better way to catch and display all errors in dev mode ?
    (new PrivateApi())->run();
} catch (Throwable $e) {

    if (!isset(PrivateApi::$static)) {
        die("<b>Error before initialization:</b> {$e->getMessage()}");
    }

    if (PrivateApi::$static->getConfig()->isDevMode()) {
        dd($e);
    }
}
