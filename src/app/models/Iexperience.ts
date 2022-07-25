import { Byte } from "@angular/compiler/src/util"


export interface Iexperience{

    id:number,
       
    position:   String,
    company:    String,
    imagen:Byte[],
    srcImagen:string,
    mode:       String
    dateStart:  String,
    dateEnd:    String,
    timeElapsed:String

}