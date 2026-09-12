import { Context } from './Context';
declare class NexardaError extends Error {
    isNexardaError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { NexardaError };
