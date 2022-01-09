"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const databse_1 = require("../database/databse");
const clientes_1 = require("../model/clientes");
const discos_1 = require("../model/discos");
const maquinas_1 = require("../model/maquinas");
const pedido_1 = require("../model/pedido");
class DatoRoutes {
    constructor() {
        this.verpedidoscliente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield databse_1.db
                .conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield clientes_1.Clientes.aggregate([
                    {
                        $lookup: {
                            from: "pedidos",
                            localField: "_ID",
                            foreignField: "_id_cliente",
                            as: "array",
                        },
                    },
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            databse_1.db.desconectarBD();
        });
        this.catalogo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield databse_1.db
                .conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                //console.log(mensaje)
                let Query = [];
                Query.push(yield maquinas_1.Tocadisco.find({}));
                Query.push(yield discos_1.Discos.find({}));
                Query.flat(1);
                res.json(Query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            databse_1.db.desconectarBD();
        });
        this.crear_vinilo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield databse_1.db
                .conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                let hola = yield discos_1.Discos.findOne({ _ID: id });
                if (hola == null) {
                    const { nombre, tamaño, stock, precio } = req.query;
                    const Schemavinilo = {
                        _ID: id,
                        _nombre: nombre,
                        _tamaño: tamaño,
                        _stock: stock,
                        _precio: precio,
                    };
                    const objvini = new discos_1.Discos(Schemavinilo);
                    yield objvini.save();
                    res.send("creado");
                }
                else {
                    res.send("ya existe un vinilo con ese ID");
                }
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            databse_1.db.desconectarBD();
        });
        this.modificar_vinilo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield databse_1.db
                .conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const { nombre, tamaño, stock, precio } = req.query;
                yield discos_1.Discos.findOneAndUpdate({
                    _ID: id,
                }, {
                    _nombre: nombre,
                    _tamaño: tamaño,
                    _stock: stock,
                    _precio: precio,
                }, {
                    new: true,
                })
                    .then((docu) => res.send(docu))
                    .catch((fail) => res.send(fail));
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            databse_1.db.desconectarBD();
        });
        this.borrar_vinilo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield databse_1.db
                .conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                yield discos_1.Discos.findOneAndDelete({ _ID: id })
                    .then((docu) => {
                    if (docu == null) {
                        res.send("no existe tal vinilo");
                    }
                    else {
                        res.send("eliminado correctamente");
                    }
                })
                    .catch((fail) => res.send("falló"));
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            databse_1.db.desconectarBD();
        });
        this.hacer_pedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield databse_1.db
                .conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const pedido = [req.query];
                const arr = pedido.map((elemento) => Object.entries(elemento)).flat();
                const ShcmeaPedido = {
                    _ID: Math.trunc(Math.random() * (9999 - 1111) + 1111 - Math.random() + Math.random()),
                    _objetos: arr,
                    _fecha: new Date(),
                    _id_cliente: req.params.id,
                    _precio: "desconocido"
                };
                const obj = new pedido_1.Pedidos1(ShcmeaPedido);
                yield obj.save();
                res.send("pedido realizado");
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            databse_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get("/catalogo", this.catalogo);
        this._router.get("/verpedido", this.verpedidoscliente);
        this._router.post("/vinilo/:id", this.crear_vinilo);
        this._router.put("/modivinilo/:id", this.modificar_vinilo);
        this._router.delete("/delvinilo/:id", this.borrar_vinilo);
        this._router.post("/pedido/:id", this.hacer_pedido);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
