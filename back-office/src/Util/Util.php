<?php


namespace App\Util;


class Util
{
    const NAVBAR_ITEMS = [
        'Utilisateurs' => [
            'url' => '/user',
            'subLinks' => [
                'Nouvel utilisateur' => [
                    'url' => '/user/new'
                ],
                'Liste des utilisateurs' => [
                    'url' => '/user'
                ]
            ]
        ],
        'Questions' => [
            'url' => '/questions',
            'subLinks' => [
                'Nouvelle question' => [
                    'url' => '/questions/new'
                ],
                'Liste des questions' => [
                    'url' => '/questions'
                ]
            ]
        ],
        'Catégories' => [
            'url' => '/categories',
            'subLinks' => [
                'Nouvelle catégorie' => [
                    'url' => '/categories/new'
                ],
                'Liste des catégories' => [
                    'url' => '/categories'
                ]
            ]
        ],
        'Type de questions' => [
            'url' => '/question-types',
            'subLinks' => [
                'Nouveau type' => [
                    'url' => '/question-types'
                ],
                'Liste des types' => [
                    'url' => '/question-types/new'
                ]
            ]
        ],
        'Autres' => [
            'subLinks' => [
                'Refresh tokens' => [
                    'url' => '/refresh-tokens'
                ]
            ]
        ],
        'Déconnexion' => [
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
