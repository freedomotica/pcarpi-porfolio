import { Byte } from "@angular/compiler/src/util";
import { Iavatar } from "./Iavatar";

export class Avatar implements Iavatar {
    
        id!:number
        name!:string
        imagen!:Byte[]
    
    constructor(){}
}