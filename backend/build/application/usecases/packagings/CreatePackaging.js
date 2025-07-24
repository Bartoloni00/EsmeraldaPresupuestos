"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreatePackaging;
function CreatePackaging(packaging) {
    return {
        id: packaging.id,
        title: packaging.title,
        descripcion: packaging.descripcion,
    };
}
