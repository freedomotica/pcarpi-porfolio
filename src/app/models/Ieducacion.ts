import { Byte } from "@angular/compiler/src/util"


export interface Ieducacion{

    id:         number,
       
    school:     String,
    title:      String,
    imagen:     Byte[],
    srcImagen:  String,
    career:     String
    dateStart:  String,
    dateEnd:    String,
    score:      number

}