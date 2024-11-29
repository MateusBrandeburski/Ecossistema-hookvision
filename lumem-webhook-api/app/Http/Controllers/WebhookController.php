<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class WebhookController extends Controller
{

    /**
     * @OA\Post(
     *     path="/web-hook",
     *     operationId="webHook",
     *     tags={"Pagamentos"},
     *     summary="Envia dados de pagamento",
     *     @OA\RequestBody(
     *         required=true,
     *         description="Dados do pagamento",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 type="object",
     *                 required={"nome", "email", "status", "valor", "forma_pagamento", "parcelas"},
     *                 @OA\Property(property="nome", type="string"),
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="status", type="string"),
     *                 @OA\Property(property="valor", type="string"),
     *                 @OA\Property(property="forma_pagamento", type="string"),
     *                 @OA\Property(property="parcelas", type="string"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Sucesso"
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Erro: Requisição inválida"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */


    public function index()
    {

        $content = self::contrutorWebhook();
        $webhook_url = 'http://flask:5000/webhook-pagamentos';

        $client = new Client();

        $response = $client->post($webhook_url, [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => $content,
        ]);

        return response($response->getBody(), $response->getStatusCode(), $response->getHeaders());
    }


    public function contrutorWebhook()
    {
        $content = [];
        $nomes = ["Mahinder", "Vanessa", "João", "Maria", "Pedro", "Lucas", "Larissa", "Bruno", "Carla", "Mariana", "André", "Fernanda", "Rafael", "Juliana", "Gustavo", "Amanda", "Thiago", "Patrícia", "Rodrigo"];
        $valores = [500.00, 750.50, 325.25, 900.10, 420.75, 800.30, 275.50, 600.00, 350.25, 725.80, 490.50, 880.25, 400.75, 625.30, 210.00, 950.25, 575.40, 325.00, 770.75, 520.30];

        $formasPagamento = ["cartao_credito", "pix", "boleto"];
        $status = ["aprovado", "recusado", "reembolsado"];

        $provedoresEmail = ["gmail.com", "hotmail.com", "yahoo.com", "protonmail.com", "outlook.com", "aol.com", "icloud.com", "zoho.com", "duckduckgo.com", "yandex.com"];


        for ($i = 0; $i < 20; $i++) {
            $randomNome = $nomes[array_rand($nomes)];
            $randomProvedor = $provedoresEmail[array_rand($provedoresEmail)];
            $randomEmail = strtolower(str_replace(' ', '', $randomNome)) . "@" . $randomProvedor;
            $randomFormaPagamento = $formasPagamento[array_rand($formasPagamento)];
            $randomStatus = $status[array_rand($status)];
            $randomValor = $valores[array_rand($valores)];
            $randomParcelas = rand(1, 12);

            $registro = [
                "nome" => $randomNome,
                "email" => $randomEmail,
                "status" => $randomStatus,
                "valor" => $randomValor,
                "forma_pagamento" => $randomFormaPagamento,
                "parcelas" => $randomParcelas
            ];

            $content[] = $registro;
        }
        $randomIndex = array_rand($content);
        return $content[$randomIndex];
    }


}

