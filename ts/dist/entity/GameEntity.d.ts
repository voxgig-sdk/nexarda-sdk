import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Game, GameLoadMatch, GameListMatch } from '../NexardaTypes';
declare class GameEntity extends NexardaEntityBase<Game> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: GameEntity): GameEntity;
    load(this: any, reqmatch?: GameLoadMatch, ctrl?: Control): Promise<GameEntity>;
    list(this: any, reqmatch?: GameListMatch, ctrl?: Control): Promise<GameEntity[]>;
}
export { GameEntity };
