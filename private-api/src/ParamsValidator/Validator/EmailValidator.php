<?php


namespace PrivateApi\ParamsValidator\Validator;


class EmailValidator extends AbstractValidator
{
    public function validate(): bool
    {
        if (is_null($this->paramValue)) {
            return true;
        }

        if (filter_var($this->paramValue, FILTER_VALIDATE_EMAIL) === false) {
            $this->error = "{$this->paramName} must be a valid email address";
            return false;
        }

        return true;
    }
}
