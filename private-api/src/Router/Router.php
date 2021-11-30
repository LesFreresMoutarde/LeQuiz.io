<?php


namespace PrivateApi\Router;


use PrivateApi\Responder\Email\SendResetPasswordEmailResponder;
use PrivateApi\Responder\Email\SendWelcomeEmailResponder;
use PrivateApi\Responder\ReceiveContactFormMessageResponder;
use PrivateApi\Responder\ResponderInterface;
use Slim\App;
use Slim\Interfaces\RouteInterface;

class Router
{
    private $responderRespondFunction = 'respond';

    public function __construct(
        private App $slim
    ) {}

    public function registerRoutes()
    {
        // TODO use a config array for all routes ?
        $this->registerRoute('/receive-contact-form-message', ReceiveContactFormMessageResponder::class, 'POST');
        $this->registerRoute('/email/send-welcome-email', SendWelcomeEmailResponder::class, 'POST');
        $this->registerRoute('/email/send-reset-password-email', SendResetPasswordEmailResponder::class, 'POST');
    }

    private function registerRoute(string $uri, string $responderClass, array|string $methods = null): RouteInterface
    {
        try { // Check that $responderClass implements ResponderInterface
            $responderClassReflection = new \ReflectionClass($responderClass);

            if (!$responderClassReflection->implementsInterface(ResponderInterface::class)) {
                throw new \InvalidArgumentException('Responder Class must implement interface ' . ResponderInterface::class);
            }
        } catch (\InvalidArgumentException $e) {
            throw $e;
        } catch (\Exception $e) { // Instanciation of ReflectionClass can throw a ReflectionException if class does not exist
            throw new \InvalidArgumentException($e->getMessage(), $e->getCode(), $e);
        }

        $callable = $responderClass . ':' . $this->responderRespondFunction;

        if (is_null($methods)) { // Catch all HTTP methods if the methods are not explicitly defined
            return $this->slim->any($uri, $callable);
        }

        if (is_string($methods)) { // Slim function needs an array of strings
            $methods = [$methods];
        }

        return $this->slim->map($methods, $uri, $callable);
    }
}
