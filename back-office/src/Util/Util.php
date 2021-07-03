<?php


namespace App\Util;


use Symfony\Component\HttpFoundation\Request;

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

    static function isUuidValid(string $uuid): bool
    {
        return (bool) preg_match('/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i', $uuid);
    }

    static function getRandomIntAsUniqueId(int $nbOfId, int $min, int $max): array
    {
        $uniqueIds = [];

        for ($i = 0; $i < $nbOfId; $i++) {
            do {
                $uniqueId = random_int($min,$max);
            } while (in_array($uniqueId, $uniqueIds));

            $uniqueIds[] = $uniqueId;
        }

        return  $uniqueIds;
    }

    static function getParamFromUrl(Request $request, $filters): array
    {
        $params = [];

        for ($i = 0; $i < count($filters); $i++) {
            if ($request->query->get($filters[$i]) !== '' && !is_null($request->query->get($filters[$i])))
                $params[$filters[$i]] = $request->query->get($filters[$i]);
        }

        return $params;
    }

    static function getRandomString($length)
    {
        return bin2hex(random_bytes($length / 2));
    }

}
