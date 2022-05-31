import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn:'root'
})

export class EstadoService {
 
  private logueado = new BehaviorSubject<boolean>(false);
  logueado$ = this.logueado.asObservable();

  constructor() { }

  logIn(){
    this.logueado.next(true)
  }
  logOut(){
    this.logueado.next(false)
  }

}
