<?php


namespace PrivateApi\ParamsValidator\Validator;


abstract class AbstractValidator implements ValidatorInterface
{
    protected ?string $error = null;

    public function __construct(
        protected string $paramName,
        protected mixed $paramValue,
    ) {}

    public function getError(): ?string
    {
        return $this->error;
    }
}
