"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedidos1 = void 0;
const mongoose_1 = require("mongoose");
const discoSchema = new mongoose_1.Schema({
    _ID: {
        type: Number
    },
    _objetos: {
        type: Array()
    },
    _fecha: {
        type: String
    },
    _id_cliente: {
        type: Number
    },
    _precio_total: {
        type: Number
    }
});
exports.Pedidos1 = (0, mongoose_1.model)('pedidos', discoSchema);
