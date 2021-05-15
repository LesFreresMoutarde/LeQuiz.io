<?php


namespace PrivateApi\ParamsValidator\Validator;


class RequiredValidator extends AbstractValidator
{
    public function validate(): bool
    {
        if (is_null($this->paramValue)) {
            $this->error = "{$this->paramName} must be set";
            return false;
        }

        return true;
    }
}
