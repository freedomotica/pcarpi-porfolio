import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppEstado } from '../estado/app.estado';
import { IappEstado } from '../estado/Iapp.estado';

@Injectable({
  providedIn:'root'
})

//Servicio que contiene el estado de la aplicacion y donde suscribirse a los cambios de estados
export class EstadoService {
 
  private estadoApp = new BehaviorSubject<IappEstado>(new AppEstado());
  estadoApp$ = this.estadoApp.asObservable();

  constructor() { }

  //actualizo el estado y se le comunica a los subscriptores
  updateEstado(estado:IappEstado){
    this.estadoApp.next(estado)
  }
  

}
