<?php


namespace App\Util;


class Util
{
    const NAVBAR_ITEMS = [
        'Utilisateurs' => [
            'url' => '/users',
            'label' => 'users',
        ],
        'Questions' => [
            'url' => '/questions',
            'label' => 'questions',
        ],
        'Catégories' => [
            'url' => '/categories',
            'label' => 'categories',
        ],
        'Type de questions' => [
            'url' => '/question-types',
            'label' => 'question-types',
        ],
        'Tokens' => [
            'url' => '/refresh-tokens',
            'label' => 'refresh-tokens',
        ],
        'Déconnexion' => [
            'label' => 'logout',
            'url' => '/logout'
        ]
    ];

    static function camelToSnake(string $text): string
    {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $text));
    }

    static function snakeToCamel(string $text): string
    {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $text))));
    }

}
