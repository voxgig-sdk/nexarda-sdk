import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Platform, PlatformLoadMatch } from '../NexardaTypes';
declare class PlatformEntity extends NexardaEntityBase<Platform> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: PlatformEntity): PlatformEntity;
    load(this: any, reqmatch?: PlatformLoadMatch, ctrl?: Control): Promise<PlatformEntity>;
}
export { PlatformEntity };
