
import { Avatar } from "./Avatar";
import { Experience } from "./Experience";


export interface ImiPorfolio{
    about: string;
    backImage: string;
    budge: string;
    educacion: Array<any>;
    experience: Array<Experience>;
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