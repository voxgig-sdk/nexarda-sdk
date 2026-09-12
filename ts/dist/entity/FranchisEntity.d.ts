import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Franchis, FranchisLoadMatch, FranchisListMatch } from '../NexardaTypes';
declare class FranchisEntity extends NexardaEntityBase<Franchis> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: FranchisEntity): FranchisEntity;
    load(this: any, reqmatch?: FranchisLoadMatch, ctrl?: Control): Promise<FranchisEntity>;
    list(this: any, reqmatch?: FranchisListMatch, ctrl?: Control): Promise<FranchisEntity[]>;
}
export { FranchisEntity };
