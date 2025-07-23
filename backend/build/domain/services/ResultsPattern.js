"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    success;
    pagination;
    data;
    error;
    constructor(success, data, pagination, error) {
        this.success = success;
        this.pagination = pagination;
        this.data = data;
        this.error = error;
    }
    static success(data, pagination) {
        return new Result(true, data, pagination);
    }
    static failure(error) {
        return new Result(false, undefined, undefined, error);
    }
}
exports.default = Result;
