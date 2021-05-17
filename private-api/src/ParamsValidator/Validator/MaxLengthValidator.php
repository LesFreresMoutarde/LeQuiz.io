<?php


namespace PrivateApi\ParamsValidator\Validator;


class MaxLengthValidator extends AbstractValidator
{
    public function __construct(string $paramName, mixed $paramValue, protected ?int $maxLength = null)
    {
        parent::__construct($paramName, $paramValue);
    }

    public function validate(): bool
    {
        if (!is_string($this->paramValue)) {
            return true;
        }

        if (is_null($this->maxLength)) {
            return true;
        }

        if (mb_strlen($this->paramValue) > $this->maxLength) {
            $this->error = "{$this->paramName} must be {$this->maxLength} characters long maximum";
            return false;
        }

        return true;
    }
}
