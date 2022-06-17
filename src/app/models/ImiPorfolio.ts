import { Byte } from "@angular/compiler/src/util";

export interface ImiPorfolio{
    about: string;
    avatar: {
        id:number,
        name:string,
        imagen:Byte[]
    };
    backImage: string;
    budge: string;
    educacion: Array<any>;
    experience: Array<any>;
    id: number;
    name: string;
    position: string;
    proyectos: Array<any>;
    skill: Array<any>;
    ubicacion: string;
}