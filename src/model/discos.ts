import {Schema, model} from 'mongoose'
const discoSchema = new Schema({

    _ID:{
        type:Number
    },
    _nombre:{
        type:String
    },
    _tamaño:{
        type:String
    },
    _stock:{
        type:Number
    },
    id_cliente:{
        type:Number
    },
    _precio:{
        type:Number
    }
})

export type iVinilo = {

    _ID: number | null
    _nombre:string | null
    _tamaño:string | null
    _stock: number | null
    _precio:number | null
}
export const Discos = model ('discos', discoSchema)