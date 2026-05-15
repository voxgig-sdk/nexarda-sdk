<?php
declare(strict_types=1);

// Nexarda SDK utility: result_body

class NexardaResultBody
{
    public static function call(NexardaContext $ctx): ?NexardaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
