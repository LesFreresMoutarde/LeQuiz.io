<?php


namespace PrivateApi\ParamsValidator\Validator;


class UrlValidator extends AbstractValidator
{
    /**
     * @var string[] $schemes
     */
    protected ?array $schemes;

    public function __construct(string $paramName, mixed $paramValue, string|array $schemes = null)
    {
        parent::__construct($paramName, $paramValue);

        if (is_string($schemes)) {
            $schemes = [$schemes];
        }

        $this->schemes = $schemes;
    }

    public function validate(): bool
    {
        if (is_null($this->paramValue)) {
            return true;
        }

        if (filter_var($this->paramValue, FILTER_VALIDATE_URL) === false || !$this->validateSchemes()) {
            $this->error = "{$this->paramName} must be a valid " . (is_array($this->schemes) ? implode('/', $this->schemes) . ' ' : '') . "URL";
            return false;
        }

        return true;
    }

    private function validateSchemes(): bool
    {
        if (empty($this->schemes)) {
            return true;
        }

        foreach ($this->schemes as $scheme) {
            $scheme = mb_strtolower($scheme);
            if (str_starts_with(mb_strtolower($this->paramValue), "$scheme:")) {
                return true;
            }
        }

        return false;
    }
}
