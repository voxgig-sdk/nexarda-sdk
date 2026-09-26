import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Franchise, FranchiseLoadMatch, FranchiseListMatch } from '../NexardaTypes';
declare class FranchiseEntity extends NexardaEntityBase<Franchise> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: FranchiseEntity): FranchiseEntity;
    load(this: any, reqmatch?: FranchiseLoadMatch, ctrl?: Control): Promise<FranchiseEntity>;
    list(this: any, reqmatch?: FranchiseListMatch, ctrl?: Control): Promise<FranchiseEntity[]>;
}
export { FranchiseEntity };
