"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tocadisco = void 0;
const mongoose_1 = require("mongoose");
const maquinaSchema = new mongoose_1.Schema({
    _tipoObjeto: {
        type: String
    },
    _ID: {
        type: Number
    },
    _velocidades: {
        type: String
    },
    _corneta: {
        type: Boolean
    },
    _modelo: {
        type: String
    },
    _fecha: {
        type: Date
    },
    _reparacion: {
        type: String
    },
    _stock: {
        type: Number
    },
    _precio: {
        type: Number
    }
});
exports.Tocadisco = (0, mongoose_1.model)('maquinas', maquinaSchema);
