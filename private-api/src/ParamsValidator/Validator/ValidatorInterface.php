<?php


namespace PrivateApi\ParamsValidator\Validator;


interface ValidatorInterface
{
    /**
     * @return string|null if the param is not valid, the error
     */
    public function getError(): ?string;

    /**
     *
     * @return bool true if the param value respects the validator constraints, false otherwise
     */
    public function validate(): bool;
}
