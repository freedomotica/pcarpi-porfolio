import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { Subscription } from 'rxjs';
import { EstadoService } from 'src/app/servicios/estado.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  estadoApp!:IappEstado;
  suscription!:Subscription;


  constructor(private autenticacionService:AutenticacionService, private estadoObs:EstadoService) { 

    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp => {this.estadoApp = estadoApp;}
    )
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.autenticacionService.UsuarioAutenticado;

    if(currentUser && currentUser.token){
      req = req.clone({
       setHeaders:{
         Authorization: currentUser.token
       }
      })
    };
       
    this.estadoApp.isLoader=true
    this.estadoObs.updateEstado(this.estadoApp);    

    return next.handle(req)
      .pipe(finalize(()=>{
        this.estadoApp.isLoader=false;
        this.estadoObs.updateEstado(this.estadoApp); 
      }))
  }
}
