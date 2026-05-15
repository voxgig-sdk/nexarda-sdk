<?php
declare(strict_types=1);

// Nexarda SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NexardaMakeContext
{
    public static function call(array $ctxmap, ?NexardaContext $basectx): NexardaContext
    {
        return new NexardaContext($ctxmap, $basectx);
    }
}
