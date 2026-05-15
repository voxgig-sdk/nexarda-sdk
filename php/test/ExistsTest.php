<?php
declare(strict_types=1);

// Nexarda SDK exists test

require_once __DIR__ . '/../nexarda_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = NexardaSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
