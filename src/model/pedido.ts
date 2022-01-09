
import {Schema, model} from 'mongoose'
const discoSchema = new Schema({

    _ID:{
        type:Number
    },
    _objetos:{
        type:Array<any>()
    },
    _fecha:{
        type:String
   },
   _id_cliente:{
       type:Number
   },
   _precio_total:{
       type:Number
   }
})

export type iPedido = {

    _ID: number | null
    _objetos: Array<any> | null
    _fecha: Date | null
    _id_cliente:number |null
    _precio_total:number|null
}

export const Pedidos1 = model ('pedidos', discoSchema)