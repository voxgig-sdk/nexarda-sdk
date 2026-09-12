import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Retailer, RetailerListMatch } from '../NexardaTypes';
declare class RetailerEntity extends NexardaEntityBase<Retailer> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: RetailerEntity): RetailerEntity;
    list(this: any, reqmatch?: RetailerListMatch, ctrl?: Control): Promise<RetailerEntity[]>;
}
export { RetailerEntity };
