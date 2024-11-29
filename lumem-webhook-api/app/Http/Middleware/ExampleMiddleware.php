<?php

namespace App\Http\Middleware;

use Closure;

class ExampleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['Error' => "Cabeçalho Authorization ausente!"], 401);
        }

        if ($token != "Bearer " . getenv('APP_KEY')) {
            return response()->json(['Error' => "Token Inválido!"], 401);
        }

        return $next($request);
    }

}



