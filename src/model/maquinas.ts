import {Schema, model } from 'mongoose'
const maquinaSchema = new Schema({

    _tipoObjeto:{
        type:String
    },
    _ID:{
        type:Number
    },
    _velocidades:{
        type:String
    },
    _corneta:{
        type:Boolean
    },
    _modelo:{
        type:String
    },
    _fecha:{
        type:Date
    },
    _reparacion:{
        type:String
    },
    _stock:{
        type:Number
    },
    _precio:{
        type:Number
    }
})

export type igramofono = {

    _tipoObjeto: string | null
    _ID: number | null
    _velocidades:string | null
    _corneta:boolean | null
    _stock:number | null
    _precio:number | null
}

export type iTipotocadiscos = {

    _tipoObjeto: string | null
    _ID: number | null
    _velocidades:number | null
    _modelo:string | null
    _stock:number | null
    _precio:number | null
}



export const Tocadisco = model ('maquinas', maquinaSchema)