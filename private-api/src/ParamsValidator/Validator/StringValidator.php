<?php


namespace PrivateApi\ParamsValidator\Validator;


class StringValidator extends AbstractValidator
{
    public function validate(): bool
    {
        if (is_null($this->paramValue)) {
            return true;
        }

        if (!is_string($this->paramValue)) {
            $this->error = "{$this->paramName} must be a string";
            return false;
        }

        return true;
    }
}
