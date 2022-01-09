import { query, Request, Response, Router } from "express";
import { send } from "process";
import { db } from "../database/databse";
import { Clientes, iCliente } from "../model/clientes";
import { iVinilo, Discos } from "../model/discos";
import { Tocadisco, igramofono, iTipotocadiscos } from "../model/maquinas";
import { Pedidos1, iPedido } from "../model/pedido";

class DatoRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }
  get router() {
    return this._router;
  }
  private verpedidoscliente = async (req: Request, res: Response) => {
    await db
      .conectarBD()
      .then(async (mensaje) => {
        const query = await Clientes.aggregate([
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
      })
      .catch((mensaje) => {
        res.send(mensaje);
      });

    db.desconectarBD();
  };
  private catalogo = async (req: Request, res: Response) => {
    await db
      .conectarBD()
      .then(async (mensaje) => {
        //console.log(mensaje)
        let Query: Array<any> = [];

        Query.push(await Tocadisco.find({}));
        Query.push(await Discos.find({}));
        Query.flat(1);
        res.json(Query);
      })
      .catch((mensaje) => {
        res.send(mensaje);
      });

    db.desconectarBD();
  };
  private crear_vinilo = async (req: Request, res: Response) => {
    await db
      .conectarBD()
      .then(async (mensaje) => {
        const id = req.params.id;
        let hola = await Discos.findOne({ _ID: id });
        if (hola == null) {
          const { nombre, tamaño, stock, precio } = req.query;
          const Schemavinilo = {
            _ID: id,
            _nombre: nombre,
            _tamaño: tamaño,
            _stock: stock,
            _precio: precio,
          };
          const objvini = new Discos(Schemavinilo);
          await objvini.save();
          res.send("creado");
        } else {
          res.send("ya existe un vinilo con ese ID");
        }
      })
      .catch((mensaje) => {
        res.send(mensaje);
      });

    db.desconectarBD();
  };

  private modificar_vinilo = async (req: Request, res: Response) => {
    await db
      .conectarBD()
      .then(async (mensaje) => {
        const id = req.params.id;
        const { nombre, tamaño, stock, precio } = req.query;
        await Discos.findOneAndUpdate(
          {
            _ID: id,
          },
          {
            _nombre: nombre,
            _tamaño: tamaño,
            _stock: stock,
            _precio: precio,
          },
          {
            new: true,
          }
        )
          .then((docu: any) => res.send(docu))
          .catch((fail: any) => res.send(fail));
      })
      .catch((mensaje) => {
        res.send(mensaje);
      });

    db.desconectarBD();
  };

  private borrar_vinilo = async (req: Request, res: Response) => {
    await db
      .conectarBD()
      .then(async (mensaje) => {
        const id = req.params.id;
        await Discos.findOneAndDelete({ _ID: id })
          .then((docu: any) => {
            if (docu == null) {
              res.send("no existe tal vinilo");
            } else {
              res.send("eliminado correctamente");
            }
          })
          .catch((fail: any) => res.send("falló"));
      })
      .catch((mensaje) => {
        res.send(mensaje);
      });

    db.desconectarBD();
  };

  private hacer_pedido = async (req: Request, res: Response) => {
    await db
      .conectarBD()
      .then(async (mensaje) => {
        const pedido = [req.query];
        const arr = pedido.map((elemento) => Object.entries(elemento)).flat();
  
        const ShcmeaPedido = {

          _ID: Math.trunc(Math.random() * (9999 - 1111) + 1111 - Math.random() + Math.random()),
          _objetos: arr,
          _fecha: new Date(),
          _id_cliente: req.params.id,
          _precio: "desconocido"
        };
        const obj = new Pedidos1(ShcmeaPedido)
       await obj.save()
        res.send("pedido realizado")

      })
      .catch((mensaje) => {
        res.send(mensaje);
      });

    db.desconectarBD();
  };

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
export const routes = obj.router;
