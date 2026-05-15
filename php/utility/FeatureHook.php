<?php
declare(strict_types=1);

// Nexarda SDK utility: feature_hook

class NexardaFeatureHook
{
    public static function call(NexardaContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
