
import { Avatar } from "./Avatar";
import { ImiPorfolio } from "./ImiPorfolio";


export class MiPorfolio implements ImiPorfolio{
    about: string = '';
    avatar!: Avatar
    backImage: string = '';
    budge: string = '';
    educacion: any[] = new Array();
    experience: any[] = new Array();
    id: number = 1;
    name: string = '';
    position: string = '';
    proyectos: any[] = new Array();
    skill: any[] = new Array();
    ubicacion: string = '';
    whatsapp: string = '';
    facebook: string = '';
    linkedin: string = '';
           
    constructor(){}
}