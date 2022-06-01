import { HttpClient } from '@angular/common/http';
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
   
   obtenerDatos():Observable<any>{
    return this.http.get(`${environment.urlApi}/buscar/porfolio`);
  }
  
   //actualizo el estado y se le comunica a los subscriptores
   updateMiPorfolio(miPorfolio:ImiPorfolio){
    this.miPorfolio.next(miPorfolio)
  }
}
