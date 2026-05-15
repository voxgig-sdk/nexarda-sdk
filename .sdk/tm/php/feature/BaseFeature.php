<?php
declare(strict_types=1);

// Nexarda SDK base feature

class NexardaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NexardaContext $ctx, array $options): void {}
    public function PostConstruct(NexardaContext $ctx): void {}
    public function PostConstructEntity(NexardaContext $ctx): void {}
    public function SetData(NexardaContext $ctx): void {}
    public function GetData(NexardaContext $ctx): void {}
    public function GetMatch(NexardaContext $ctx): void {}
    public function SetMatch(NexardaContext $ctx): void {}
    public function PrePoint(NexardaContext $ctx): void {}
    public function PreSpec(NexardaContext $ctx): void {}
    public function PreRequest(NexardaContext $ctx): void {}
    public function PreResponse(NexardaContext $ctx): void {}
    public function PreResult(NexardaContext $ctx): void {}
    public function PreDone(NexardaContext $ctx): void {}
    public function PreUnexpected(NexardaContext $ctx): void {}
}
