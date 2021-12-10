<?php

return [
    'devMode' => true, // Must be false in production (default false if not set)

    'frontUrl' => 'http://localhost',

    'dbHost' => 'database',
    'dbName' => 'lequiz-io',
    'dbUser' => 'admin',
    'dbPassword' => 'admin',

    'email' => [
        'host' => 'mailhog',
        'port' => 1025,
        'username' => '',
        'password' => '',
        'ssl' => false,
    ]
];
