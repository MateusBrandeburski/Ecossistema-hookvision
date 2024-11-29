<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{

    /**
     * @OA\Info(
     *   title="WebHook - Lumen",
     *   version="1.0",
     *   @OA\Contact(
     *     email="mateus.brandeburski92@gmail.com",
     *     name="Support Team"
     *   )
     *
     * )
     * @OA\SecurityScheme(
        *     securityScheme="bearerAuth",
        *     type="http",
        *     scheme="bearer",
        * )
        *
        */

}
