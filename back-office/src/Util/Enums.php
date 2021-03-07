<?php


namespace App\Util;


class Enums
{
    public const USER_FREE_PLAN = 'free';
    public const USER_PREMIUM_PLAN = 'premium';
    public const USER_VIP_PLAN = 'vip';

    public const USER_PLANS = [self::USER_FREE_PLAN, self::USER_PREMIUM_PLAN, self::USER_VIP_PLAN];

    public const USER_MEMBER_ROLE = 'member';
    public const USER_REVIEWER_ROLE = 'reviewer';
    public const USER_ADMIN_ROLE = 'admin';

    public const USER_ROLES = [self::USER_MEMBER_ROLE, self::USER_REVIEWER_ROLE, self::USER_ADMIN_ROLE];

    public const EASY_QUESTION_DIFFICULTY = 'easy';
    public const MEDIUM_QUESTION_DIFFICULTY = 'medium';
    public const HARD_QUESTION_DIFFICULTY = 'hard';

    public const QUESTION_DIFFICULTY = [
        self::EASY_QUESTION_DIFFICULTY,
        self::MEDIUM_QUESTION_DIFFICULTY,
        self::HARD_QUESTION_DIFFICULTY
    ];

    public const APPROVED_STATUS = 'approved';
    public const PENDING_STATUS = 'pending';
    public const DISAPPROVED_STATUS = 'disapproved';

    public const STATUSES = [
        self::APPROVED_STATUS,
        self::PENDING_STATUS,
        self::DISAPPROVED_STATUS
    ];

    public const ASCENSION_GAME_MODE = [
        'name' => 'Ascension',
        'label' => 'Ascension',
        'description' => 'Le jeu comporte un nombre défini de questions. À la fin de celles ci le joueur
        ayant le score le plus élevé remporte la partie.',
        'win_criterion' => [
            'type' => 'number',
            'label' => 'Score à atteindre'
        ]
    ];

    public const BLITZ_GAME_MODE = [
        'name' => 'Blitz',
        'label' => 'Blitz',
        'description' => 'Le joueur qui marque le plus de points dans un temps imparti remporte la partie.',
        'win_criterion' => [
            'type' => 'time',
            'label' => 'Durée de la partie'
        ]
    ];

    public const SERIE_GAME_MODE = [
        'name' => 'Serie',
        'label' => 'Série',
        'description' => 'Le jeu comporte un nombre défini de questions. À la fin de celles ci le joueur
        ayant le score le plus élevé remporte la partie.',
        'win_criterion' => [
            'type' => 'number',
            'label' => 'Nombre de questions'
        ]
    ];

    public const SURVIVANT_GAME_MODE = [
        'name' => 'Survivant',
        'label' => 'Survivant',
        'description' => 'Dans cette série de questions éliminatoires, le dernier joueur encore en lice remporte la partie.',
        'win_criterion' => [
            'type' => null,
            'label' => null
        ]
    ];

    public const GAME_MODES = [
        self::ASCENSION_GAME_MODE['label'],
        self::BLITZ_GAME_MODE['label'],
        self::SERIE_GAME_MODE['label'],
        self::SURVIVANT_GAME_MODE['label']
    ];
}
