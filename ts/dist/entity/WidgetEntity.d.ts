import { NexardaEntityBase } from '../NexardaEntityBase';
import type { NexardaSDK } from '../NexardaSDK';
import type { Control } from '../types';
import type { Widget, WidgetLoadMatch } from '../NexardaTypes';
declare class WidgetEntity extends NexardaEntityBase<Widget> {
    constructor(client: NexardaSDK, entopts: any);
    make(this: WidgetEntity): WidgetEntity;
    load(this: any, reqmatch?: WidgetLoadMatch, ctrl?: Control): Promise<WidgetEntity>;
}
export { WidgetEntity };
