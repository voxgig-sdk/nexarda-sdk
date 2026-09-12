import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Console, ConsoleLoadMatch, ConsoleListMatch } from '../NexardaTypes';
declare class ConsoleEntity extends NexardaEntityBase<Console> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: ConsoleEntity): ConsoleEntity;
    load(this: any, reqmatch?: ConsoleLoadMatch, ctrl?: Control): Promise<ConsoleEntity>;
    list(this: any, reqmatch?: ConsoleListMatch, ctrl?: Control): Promise<ConsoleEntity[]>;
}
export { ConsoleEntity };
