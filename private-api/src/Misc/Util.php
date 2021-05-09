<?php


namespace PrivateApi\Misc;


class Util
{
    /**
     * @param string $templatePath the path to the PHP template to render
     * @param array $params the params (variables
     * @return string the rendered template
     * @throws \RuntimeException if $templatePath is not a file
     */
    public static function renderTemplate(string $templatePath, array $params = []): string
    {
        if (!file_exists($templatePath)) {
            throw new \RuntimeException("$templatePath does not exist");
        }

        if (is_dir($templatePath)) {
            throw new \RuntimeException("$templatePath is a directory");
        }

        extract($params);

        ob_start();
        require($templatePath);
        return ob_get_clean();
    }
}
