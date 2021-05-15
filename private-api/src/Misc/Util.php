<?php


namespace PrivateApi\Misc;


class Util
{
    public static function formatThrowableAsArray(\Throwable $e): array
    {
        $array = [
            'error' => $e::class,
            'message' => $e->getMessage(),
            'stackTrace' => $e->getTrace(),
        ];

        if (!is_null($e->getPrevious())) {
            $array['previous'] = Util::formatThrowableAsArray($e->getPrevious());
        }

        return $array;
    }

    /**
     * @return string the Private API root path
     */
    public static function getAppBasePath(): string
    {
        $path = __DIR__ . '/..';
        return realpath($path);
    }

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
