<?php
declare(strict_types=1);

// Nexarda SDK utility: prepare_body

class NexardaPrepareBody
{
    public static function call(NexardaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
