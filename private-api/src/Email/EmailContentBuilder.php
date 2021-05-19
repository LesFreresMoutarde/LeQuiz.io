<?php


namespace PrivateApi\Email;


use PrivateApi\Misc\Util;

class EmailContentBuilder
{
    const LAYOUT_PART_BEFORE_CONTENT = 0;
    const LAYOUT_PART_AFTER_CONTENT = 1;
    const LAYOUT_PART_AFTER_FOOTER = 2;

    const LAYOUT_TEMPLATE_NAME = 'layout/email-layout';
    const FOOTER_SECTIONS_TEMPLATE_NAME = 'layout/footer-sections';
    const TEMPLATE_NAME_SUFFIX = '.php';
    const TEMPLATE_NAME_TEXT_PLAIN_SUFFIX = '.text-plain' . self::TEMPLATE_NAME_SUFFIX;

    const FOOTER_SECTION_AUTOMATIC_EMAIL_NO_REPLY = 0;
    const FOOTER_SECTION_DID_NOT_REQUESTED_PASSWORD_RESET = 1;

    private array $footerSections = [];

    private array $templateParams = [];

    private string $templateName;

    public function addFooterSection($footerSection): self
    {
        $this->footerSections[] = $footerSection;

        return $this;
    }

    public function getHtmlContent(): string
    {
        if (!isset($this->templateName)) {
            throw new \RuntimeException('No template to render');
        }

        ob_start();

        echo $this->renderLayoutPart(self::LAYOUT_PART_BEFORE_CONTENT);

        echo Util::renderTemplate($this->getTemplatePath() . '/' . $this->templateName . self::TEMPLATE_NAME_SUFFIX, $this->templateParams);

        echo $this->renderLayoutPart(self::LAYOUT_PART_AFTER_CONTENT);

        foreach ($this->footerSections as $footerSection) {
            echo $this->renderHtmlFooterSection($footerSection);
        }

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
        foreach ($this->footerSections as $footerSection) {
            echo $this->renderTextFooterSection($footerSection);
        }

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

    private function renderHtmlFooterSection($footerSection): string
    {
        return Util::renderTemplate($this->getTemplatePath() . '/' . self::FOOTER_SECTIONS_TEMPLATE_NAME . self::TEMPLATE_NAME_SUFFIX, [
            'footerSection' => $footerSection,
        ]);
    }

    private function renderTextFooterSection($footerSection): string
    {
        return Util::renderTemplate($this->getTemplatePath() . '/' . self::FOOTER_SECTIONS_TEMPLATE_NAME . self::TEMPLATE_NAME_TEXT_PLAIN_SUFFIX, [
            'footerSection' => $footerSection,
        ]);
    }

    private function renderLayoutPart($layoutPart): string
    {
        return Util::renderTemplate($this->getTemplatePath() . '/' . self::LAYOUT_TEMPLATE_NAME . self::TEMPLATE_NAME_SUFFIX, [
            'layoutPart' => $layoutPart,
        ]);
    }
}
