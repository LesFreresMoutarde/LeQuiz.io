<?php


namespace PrivateApi\Email;


use PrivateApi\Misc\Util;

class EmailContentBuilder
{
    const LAYOUT_PART_BEFORE_CONTENT = 0;
    const LAYOUT_PART_AFTER_CONTENT = 1;
    const LAYOUT_PART_AFTER_FOOTER = 2;

    const LAYOUT_TEMPLATE_NAME = 'email-layout';
    const TEMPLATE_NAME_SUFFIX = '.php';
    const TEMPLATE_NAME_TEXT_PLAIN_SUFFIX = '.text-plain' . self::TEMPLATE_NAME_SUFFIX;

    private array $templateParams = [];

    private string $templateName;

    public function getHtmlContent(): string
    {
        if (!isset($this->templateName)) {
            throw new \RuntimeException('No template to render');
        }

        ob_start();

        echo $this->renderLayoutPart(self::LAYOUT_PART_BEFORE_CONTENT);
        echo Util::renderTemplate($this->getTemplatePath() . '/' . $this->templateName . self::TEMPLATE_NAME_SUFFIX, $this->templateParams);
        echo $this->renderLayoutPart(self::LAYOUT_PART_AFTER_CONTENT);
        echo $this->renderLayoutPart(self::LAYOUT_PART_AFTER_FOOTER);

        return ob_get_clean();
    }

    public function getTextContent(): string
    {
        if (!isset($this->templateName)) {
            throw new \RuntimeException('No template to render');
        }

        ob_start();

        echo Util::renderTemplate($this->getTemplatePath() . '/' . $this->templateName . self::TEMPLATE_NAME_TEXT_PLAIN_SUFFIX, $this->templateParams);
        echo 'Ceci est un email automatique, veuillez ne pas y répondre.';

        return ob_get_clean();
    }

    public function setTemplate(string $templateName): self
    {
        $templatePath = $this->getTemplatePath() . "/{$templateName}" . self::TEMPLATE_NAME_SUFFIX;

        if (!is_file($templatePath)) {
            throw new \RuntimeException("Template $templateName not found");
        }

        $this->templateName = $templateName;

        return $this;
    }

    public function setTemplateParams(array $params): self
    {
        $this->templateParams = $params;

        return $this;
    }

    private function getTemplatePath(): string
    {
        return Util::getAppBasePath() . '/Email/Template';
    }

    private function renderLayoutPart($layoutPart): string
    {
        return Util::renderTemplate($this->getTemplatePath() . '/' . self::LAYOUT_TEMPLATE_NAME . self::TEMPLATE_NAME_SUFFIX, [
            'layoutPart' => $layoutPart,
        ]);
    }
}
