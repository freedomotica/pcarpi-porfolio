import { Byte } from "@angular/compiler/src/util";
import { Iskill } from "./Iskill";


export class Skill implements Iskill {
    id!:        number
       
    name!:      String
    progress!:  number
    imagen!:    Byte[]
    srcImagen!: String
    type!:      String
    
    constructor(){}
    
    
}