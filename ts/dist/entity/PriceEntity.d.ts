import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Price, PriceListMatch } from '../NexardaTypes';
declare class PriceEntity extends NexardaEntityBase<Price> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: PriceEntity): PriceEntity;
    list(this: any, reqmatch?: PriceListMatch, ctrl?: Control): Promise<PriceEntity[]>;
}
export { PriceEntity };
