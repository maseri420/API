import {Schema, model } from 'mongoose';

const clienteSchema = new Schema ({

    _ID :{
        type : Number 
    },
    _Edad:{
        type: Number
    },
    _Nombre:{
        type:String
    },
    _carrito:{
        type: []
    }
})
export type iCliente = {
    _ID : number | null
    _Edad: number | null
    _Nombre: string | null
    _carrito: Array<any> | null
}

export const Clientes = model ('Clientes', clienteSchema)