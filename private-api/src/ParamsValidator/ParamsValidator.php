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
     *     'someParam' => SomeValidator::class,
     *     'anotherParam' => [
     *         FirstValidator::class,
     *         SecondValidator::class,
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
                $paramValidators = [$paramValidators];
            }

            foreach ($paramValidators as $paramValidator) {
                $this->ensureValidator($paramValidator);

                $this->validators[$paramName][] = new $paramValidator($paramName, $this->params[$paramName]);
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
}
