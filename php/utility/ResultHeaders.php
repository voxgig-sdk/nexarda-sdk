<?php
declare(strict_types=1);

// Nexarda SDK utility: result_headers

class NexardaResultHeaders
{
    public static function call(NexardaContext $ctx): ?NexardaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
