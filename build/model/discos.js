"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discos = void 0;
const mongoose_1 = require("mongoose");
const discoSchema = new mongoose_1.Schema({
    _ID: {
        type: Number
    },
    _nombre: {
        type: String
    },
    _tamaño: {
        type: String
    },
    _stock: {
        type: Number
    },
    id_cliente: {
        type: Number
    },
    _precio: {
        type: Number
    }
});
exports.Discos = (0, mongoose_1.model)('discos', discoSchema);
