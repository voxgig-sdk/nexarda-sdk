<?php
declare(strict_types=1);

// Nexarda SDK utility: feature_add

class NexardaFeatureAdd
{
    public static function call(NexardaContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
