"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'object',
    required: ['code', 'password', 'emailCode'],
    properties: {
        code: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        emailCode: {
            type: 'string',
        },
    },
};
