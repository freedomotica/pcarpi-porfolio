import { Byte } from "@angular/compiler/src/util";
import { Ieducacion } from "./Ieducacion";


export class Educacion implements Ieducacion {
    id!:         number
       
    school!:     String
    title!:      String
    imagen!:     Byte[]
    srcImagen!:  String
    career!:     String
    dateStart!:  String
    dateEnd!:    String
    score!:      number

    constructor(){}
    
    
}