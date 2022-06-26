import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppEstado } from 'src/app/estado/app.estado';

import { IappEstado } from 'src/app/estado/Iapp.estado';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.component.html',
  styleUrls: ['./inicio-session.component.css']
})
export class InicioSessionComponent implements OnInit, OnDestroy {
  form:FormGroup;
  estadoApp!:IappEstado;
  suscription!:Subscription;
  
  constructor(private FormBuilder:FormBuilder,
               private autenticacionService:AutenticacionService,
               private rutas:Router,
               private estadoObs:EstadoService
               ) {
    this.form = this.FormBuilder.group(
      {
      user:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })

    
    

   }

  ngOnInit(): void {
    this.suscription = this.estadoObs.estadoApp$.subscribe(
                          estadoApp => {this.estadoApp = estadoApp;
                          console.log('inicio-sesion',this.estadoApp);
                          }
                        )


  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  get User(){
    return this.form.get('user');
  }
  
  get Password(){
    return this.form.get('password');
  }

  onEnviar(e:Event){
    e.preventDefault;
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data =>{
      
      var payloads = JSON.parse(data.payloads)//payloads trae los datos como json
      console.log(payloads);
      
      if(payloads.token){
      sessionStorage.setItem('currentUser',JSON.stringify(payloads));//guardo en sessionStorage como string
      this.autenticacionService.currenUserSubject.next(payloads);
      
      this.estadoApp.logueado=true
      this.estadoObs.updateEstado(this.estadoApp);

      this.rutas.navigate(['/porfolio'])
      }else{
        this.rutas.navigate(['/login'])
      }
    })
  }

}
