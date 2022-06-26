
import { Avatar } from "./Avatar";


export interface ImiPorfolio{
    about: string;
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
    whatsapp: string;
    facebook: string;
    linkedin: string;
    avatar:Avatar;
}