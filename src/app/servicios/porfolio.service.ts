import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppEstado } from '../estado/app.estado';
import { IappEstado } from '../estado/Iapp.estado';
import { ImiPorfolio } from '../models/ImiPorfolio';
import { MiPorfolio } from '../models/MiPorfolio';

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

  /* -------------------- */
  
  /* Suscripciones */

   //actualizo el estado y se le comunica a los subscriptores
   updateMiPorfolio(miPorfolio:ImiPorfolio){
    this.miPorfolio.next(miPorfolio)
  }
}
