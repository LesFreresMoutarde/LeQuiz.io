<?php


namespace App\Util;


class Util
{
    static function camelToSnake(string $text): string
    {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $text));
    }

    static function snakeToCamel(string $text): string
    {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $text))));
    }

}
