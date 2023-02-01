"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'object',
    required: ['id', 'name', 'parentId', 'describe', 'serialNum'],
    properties: {
        id: {
            type: 'number',
        },
        name: {
            type: 'string',
            minLength: 1,
        },
        parentId: {
            type: 'number',
        },
        describe: {
            type: 'string',
        },
        serialNum: {
            type: 'number',
        },
    },
};
