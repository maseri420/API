"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clientes = void 0;
const mongoose_1 = require("mongoose");
const clienteSchema = new mongoose_1.Schema({
    _ID: {
        type: Number
    },
    _Edad: {
        type: Number
    },
    _Nombre: {
        type: String
    },
    _carrito: {
        type: []
    }
});
exports.Clientes = (0, mongoose_1.model)('Clientes', clienteSchema);
