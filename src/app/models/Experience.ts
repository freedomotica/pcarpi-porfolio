import { Byte } from "@angular/compiler/src/util";
import { Iexperience } from "./Iexperience";

export class Experience implements Iexperience {
    id!: number;
    position!: String;
    company!: String;
    imagen!: Byte[];
    srcImagen!:string;
    mode!: String;
    dateStart!: String;
    dateEnd!: String;
    timeElapsed!: String;

    constructor(){}
    
    
}