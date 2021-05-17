<?php


namespace PrivateApi\ParamsValidator;


use PrivateApi\ParamsValidator\Validator\ValidatorInterface;

class ParamsValidator
{
    private array $errors = [];

    private array $params;

    private array $validators = [];

    /**
     * ParamsValidator constructor.
     * @param array $validators format :
     * [
     *     'someParam' => [SomeValidator::class],
     *     'anotherParam' => [
     *         FirstValidator::class,
     *         [SecondValidator::class, 'someValidatorParam'],
     *     ],
     * ]
     * @param array|null $params the params to validate
     */
    public function __construct(array $validators, ?array $params)
    {
        $this->params = $params ?? [];

        foreach ($validators as $paramName => $paramValidators) {
            if (!is_string($paramName)) {
                throw new \InvalidArgumentException('Param name must be a string');
            }

            if (!is_array($paramValidators)) {
                throw new \InvalidArgumentException('Param validators must be an array');
            }

            foreach ($paramValidators as $paramValidator) {
                $this->registerValidator($paramName, $paramValidator);
            }
        }
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function hasErrors(): bool
    {
        return !empty($this->getErrors());
    }

    public function validate(): bool
    {
        foreach ($this->validators as $paramName => $paramValidators) {
            /** @var ValidatorInterface[] $paramValidators */
            foreach ($paramValidators as $paramValidator) {
                if (!$paramValidator->validate()) {
                    $this->errors[$paramName][] = $paramValidator->getError();
                }
            }
        }

        return $this->hasErrors();
    }

    /**
     * Ensures that $validatorClass implements {@see ValidatorInterface} interface
     * @param string $validatorClass
     * @throws \InvalidArgumentException if $validatorClass does not implements the required interface
     */
    private function ensureValidator(string $validatorClass)
    {
        try {
            $reflection = new \ReflectionClass($validatorClass);
        } catch (\ReflectionException $e) {
            throw new \InvalidArgumentException($e->getMessage(), $e->getCode(), $e);
        }

        if (!$reflection->implementsInterface(ValidatorInterface::class)) {
            throw new \InvalidArgumentException('Validator class must implement interface ' . ValidatorInterface::class);
        }
    }

    /**
     * Registers a validator for a param
     * @param string $paramName the param to which the validator should be assigned
     * @param array|string $paramValidator the validator class or an array containing the validator class and its settings
     */
    private function registerValidator(string $paramName, array|string $paramValidator)
    {
        if (is_array($paramValidator)) {
            $validatorSettings = $paramValidator;
            $paramValidator = array_shift($validatorSettings);
        } else {
            $validatorSettings = [];
        }

        $this->ensureValidator($paramValidator);

        $this->validators[$paramName][] = new $paramValidator($paramName, $this->params[$paramName], ...$validatorSettings);
    }
}
