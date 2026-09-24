"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexardaError = void 0;
class NexardaError extends Error {
    isNexardaError = true;
    sdk = 'Nexarda';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.NexardaError = NexardaError;
//# sourceMappingURL=NexardaError.js.map