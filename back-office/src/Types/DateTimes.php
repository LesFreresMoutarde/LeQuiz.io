<?php

namespace App\Types;

use Doctrine\DBAL\Types\Type;

Type::overrideType('datetime', 'Doctrine\DBAL\Types\VarDateTimeType');
Type::overrideType('datetimetz', 'Doctrine\DBAL\Types\VarDateTimeType');
Type::overrideType('time', 'Doctrine\DBAL\Types\VarDateTimeType');

Type::overrideType('datetime_immutable', 'Doctrine\DBAL\Types\VarDateTimeImmutableType');
Type::overrideType('datetimetz_immutable', 'Doctrine\DBAL\Types\VarDateTimeImmutableType');
Type::overrideType('time_immutable', 'Doctrine\DBAL\Types\VarDateTimeImmutableType');
