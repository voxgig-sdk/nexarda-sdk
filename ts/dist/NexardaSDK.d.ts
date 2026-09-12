import { ConsoleEntity } from './entity/ConsoleEntity';
import { FranchisEntity } from './entity/FranchisEntity';
import { GameEntity } from './entity/GameEntity';
import { PlatformEntity } from './entity/PlatformEntity';
import { PriceEntity } from './entity/PriceEntity';
import { RetailerEntity } from './entity/RetailerEntity';
import { SearchEntity } from './entity/SearchEntity';
import { StudioEntity } from './entity/StudioEntity';
import { UserEntity } from './entity/UserEntity';
import { WidgetEntity } from './entity/WidgetEntity';
export type * from './NexardaTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NexardaEntityBase } from './NexardaEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class NexardaSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Console(entopts?: Record<string, any>): ConsoleEntity;
    Franchis(entopts?: Record<string, any>): FranchisEntity;
    Game(entopts?: Record<string, any>): GameEntity;
    Platform(entopts?: Record<string, any>): PlatformEntity;
    Price(entopts?: Record<string, any>): PriceEntity;
    Retailer(entopts?: Record<string, any>): RetailerEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Studio(entopts?: Record<string, any>): StudioEntity;
    User(entopts?: Record<string, any>): UserEntity;
    Widget(entopts?: Record<string, any>): WidgetEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NexardaSDK;
    tester(testopts?: any, sdkopts?: any): NexardaSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NexardaSDK;
export { stdutil, config, BaseFeature, NexardaEntityBase, NexardaSDK, SDK, };
