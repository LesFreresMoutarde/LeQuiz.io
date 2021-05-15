<?php


namespace PrivateApi\Config;


class Config
{
    private const CONFIG_ARRAY_DIR_PATH = __DIR__ . '/../../config';
    private const CONFIG_ARRAY_FILENAME = 'config.php';

    private string $dbHost;
    private string $dbName;
    private string $dbUser;
    private string $dbPassword;
    private string $dbCharset = 'utf8';

    private string $emailHost;
    private int $emailPort;
    private string $emailUsername;
    private string $emailPassword;

    private string $frontUrl;

    private bool $devMode = false;

    public function __construct()
    {
        $this->loadFromConfigArray();
    }

    public function getDbCharset(): string
    {
        return $this->dbCharset;
    }

    public function getDbHost(): string
    {
        return $this->dbHost;
    }

    public function getDbName(): string
    {
        return $this->dbName;
    }

    public function getDbPassword(): string
    {
        return $this->dbPassword;
    }

    public function getDbUser(): string
    {
        return $this->dbUser;
    }

    public function getEmailHost(): string
    {
        return $this->emailHost;
    }

    public function getEmailPassword(): string
    {
        return $this->emailPassword;
    }

    public function getEmailPort(): string
    {
        return $this->emailPort;
    }

    public function getEmailUsername(): string
    {
        return $this->emailUsername;
    }

    public function getFrontUrl(): string
    {
        return $this->frontUrl;
    }

    public function isDevMode(): bool
    {
        return $this->devMode;
    }

    private function getConfigArray(): array
    {
        $filePath = realpath(self::CONFIG_ARRAY_DIR_PATH) . '/' . self::CONFIG_ARRAY_FILENAME;

        if (!file_exists($filePath)) {
            throw new \RuntimeException("Configuration file $filePath does not exist");
        }

        $configArray = require($filePath);

        if (!is_array($configArray)) {
            throw new \RuntimeException("Configuration file $filePath must return an array");
        }

        return $configArray;
    }

    private function loadFromConfigArray()
    {
        $configArray = $this->getConfigArray();

        $this->loadDatabaseConfigFromArray($configArray);
        $this->loadEmailConfigFromArray($configArray);

        $devModeParam = 'devMode';
        $frontUrlParam = 'frontUrl';

        if (isset($configArray[$devModeParam])) {
            if (!is_bool($configArray[$devModeParam])) {
                throw new \RuntimeException("'{$devModeParam}' parameter in configuration file must be a boolean");
            }

            $this->devMode = $configArray[$devModeParam];
        }

        if (isset($configArray[$frontUrlParam])) {
            if (!is_string($configArray[$frontUrlParam])) {
                throw new \RuntimeException("'{$frontUrlParam}' parameter in configuration file must be a string");
            }

            $this->frontUrl = $configArray[$frontUrlParam];
        }
    }

    private function loadDatabaseConfigFromArray(array $configArray)
    {
        $dbHostParam = 'dbHost';
        $dbNameParam = 'dbName';
        $dbUserParam = 'dbUser';
        $dbPasswordParam = 'dbPassword';

        if (!isset($configArray[$dbHostParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$dbHostParam}' parameter");
        }

        if (!isset($configArray[$dbNameParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$dbNameParam}' parameter");
        }

        if (!isset($configArray[$dbUserParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$dbUserParam}' parameter");
        }

        if (!isset($configArray[$dbPasswordParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$dbPasswordParam}' parameter");
        }

        if (!is_string($configArray[$dbHostParam])) {
            throw new \RuntimeException("'{$dbHostParam}' parameter in configuration file must be a string");
        }

        if (!is_string($configArray[$dbNameParam])) {
            throw new \RuntimeException("'{$dbNameParam}' parameter in configuration file must be a string");
        }

        if (!is_string($configArray[$dbUserParam])) {
            throw new \RuntimeException("'{$dbUserParam}' parameter in configuration file must be a string");
        }

        if (!is_string($configArray[$dbPasswordParam])) {
            throw new \RuntimeException("'{$dbPasswordParam}' parameter in configuration file must be a string");
        }

        $this->dbHost = $configArray[$dbHostParam];
        $this->dbName = $configArray[$dbNameParam];
        $this->dbUser = $configArray[$dbUserParam];
        $this->dbPassword = $configArray[$dbPasswordParam];
    }

    private function loadEmailConfigFromArray(array $configArray)
    {
        $emailParam = 'email';
        $emailHostParam = 'host';
        $emailPortParam = 'port';
        $emailUsernameParam = 'username';
        $emailPasswordParam = 'password';

        if (!isset($configArray[$emailParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$emailParam}' parameter");
        }

        if (!is_array($configArray[$emailParam])) {
            throw new \RuntimeException("'{$emailParam}' parameter in configuration file must be an array");
        }

        $emailConfigArray = $configArray[$emailParam];

        if (!isset($emailConfigArray[$emailHostParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$emailParam}.{$emailHostParam}' parameter");
        }

        if (!isset($emailConfigArray[$emailPortParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$emailParam}.{$emailPortParam}' parameter");
        }

        if (!isset($emailConfigArray[$emailUsernameParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$emailParam}.{$emailUsernameParam}' parameter");
        }

        if (!isset($emailConfigArray[$emailPasswordParam])) {
            throw new \RuntimeException("Configuration file must contain a '{$emailParam}.{$emailPasswordParam}' parameter");
        }

        if (!is_string($emailConfigArray[$emailHostParam])) {
            throw new \RuntimeException("'{$emailHostParam}.{$emailHostParam}' parameter in configuration file must be a string");
        }

        if (!is_int($emailConfigArray[$emailPortParam])) {
            throw new \RuntimeException("'{$emailHostParam}.{$emailPortParam}' parameter in configuration file must be an integer");
        }

        if (!is_string($emailConfigArray[$emailUsernameParam])) {
            throw new \RuntimeException("'{$emailHostParam}.{$emailUsernameParam}' parameter in configuration file must be a string");
        }

        if (!is_string($emailConfigArray[$emailPasswordParam])) {
            throw new \RuntimeException("'{$emailHostParam}.{$emailPasswordParam}' parameter in configuration file must be a string");
        }

        $this->emailHost = $emailConfigArray[$emailHostParam];
        $this->emailPort = $emailConfigArray[$emailPortParam];
        $this->emailUsername = $emailConfigArray[$emailUsernameParam];
        $this->emailPassword = $emailConfigArray[$emailPasswordParam];
    }
}
