<?php



/** @var \Laravel\Lumen\Routing\Router $router */


//
/*
 * Rota WEBHOOK
 * Fazer um ShellScript com um Curl dentro e colocar na crontab para fazer requisições e enviar altomaticamento no formato WebHook
 */
$router->post('/web-hook', ['uses'=>'WebhookController@index']);
    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->post('/web-hook', ['uses'=>'WebhookController@index']);
    });
