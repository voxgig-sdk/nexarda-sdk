<?php
declare(strict_types=1);

// Nexarda SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NexardaFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NexardaBaseFeature();
            case "test":
                return new NexardaTestFeature();
            default:
                return new NexardaBaseFeature();
        }
    }
}
