import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Studio, StudioLoadMatch, StudioListMatch } from '../NexardaTypes';
declare class StudioEntity extends NexardaEntityBase<Studio> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: StudioEntity): StudioEntity;
    load(this: any, reqmatch?: StudioLoadMatch, ctrl?: Control): Promise<StudioEntity>;
    list(this: any, reqmatch?: StudioListMatch, ctrl?: Control): Promise<StudioEntity[]>;
}
export { StudioEntity };
