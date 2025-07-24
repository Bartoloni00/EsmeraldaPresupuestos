"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreatePackaging;
function CreatePackaging(packaging_id) {
    if (packaging_id === undefined) {
        return {
            'message': 'packaging_id no especificado.',
        };
    }
    return {
        'message': 'packaging eliminado.',
    };
}
