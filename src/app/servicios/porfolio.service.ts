import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppEstado } from '../estado/app.estado';
import { IappEstado } from '../estado/Iapp.estado';
import { Educacion } from '../models/Educacion';
import { Experience } from '../models/Experience';
import { ImiPorfolio } from '../models/ImiPorfolio';
import { MiPorfolio } from '../models/MiPorfolio';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {
  private miPorfolio = new BehaviorSubject<ImiPorfolio>(new MiPorfolio());
  miPorfolio$ = this.miPorfolio.asObservable();
  
  constructor(private http:HttpClient) {}
  
  /* Solicitudes a la APi */

  obtenerDatos():Observable<any>{
    return this.http.get(`${environment.urlApi}/buscar/porfolio`);
  }
  obtenerImagen(id:number):Observable<any>{
    return this.http.get(`${environment.urlApi}/buscar/avatar/${id}`);
  }


  newPersona(body:any,id:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put(`${environment.urlApi}/update/persona/${id}`,body,httpOptions);
  }

  updateAvatar(imagen:any,id:number):Observable<any>{
    var fd = new FormData();
    fd.append('imagen', imagen);
    return this.http.put(`${environment.urlApi}/update/avatar/${id}`,fd);
  }

  /* Endpoint Experiencia */

  updateExperiencia (formulario:any,id:number):Observable<any>{
      
    return this.http.put(`${environment.urlApi}/update/experience/${id}`,formulario);
  }
  deleteExperiencia (id:number):Observable<any>{
      
    return this.http.delete(`${environment.urlApi}/delete/experience/${id}`);
  }
  newExperiencia (Exper:Experience):Observable<any>{
      
    return this.http.post(`${environment.urlApi}/new/experience`,Exper);
  }

    /* Endpoint Educacion */

    updateEducacion (formulario:any,id:number):Observable<any>{
      
      return this.http.put(`${environment.urlApi}/update/educacion/${id}`,formulario);
    }
    deleteEducacion (id:number):Observable<any>{
        
      return this.http.delete(`${environment.urlApi}/delete/educacion/${id}`);
    }
    newEducacion(Exper:Educacion):Observable<any>{
        
      return this.http.post(`${environment.urlApi}/new/educacion`,Exper);
    }
   /* Endpoint Skill */

   updateSkill (formulario:any,id:number):Observable<any>{
      
    return this.http.put(`${environment.urlApi}/update/skill/${id}`,formulario);
  }
  deleteSkill (id:number):Observable<any>{
      
    return this.http.delete(`${environment.urlApi}/delete/skill/${id}`);
  }
  newSkill(Exper:Skill):Observable<any>{
      
    return this.http.post(`${environment.urlApi}/new/skill`,Exper);
  }
  /* -------------------- */
  
  /* Suscripciones */

   //actualizo el estado y se le comunica a los subscriptores
   updateMiPorfolio(miPorfolio:ImiPorfolio){
    this.miPorfolio.next(miPorfolio)
  }
}
