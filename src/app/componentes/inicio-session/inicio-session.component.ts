import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppEstado } from 'src/app/estado/app.estado';

import { IappEstado } from 'src/app/estado/Iapp.estado';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.component.html',
  styleUrls: ['./inicio-session.component.css']
})
export class InicioSessionComponent implements OnInit {
  form:FormGroup;
  logueado:boolean;
  
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

    this.logueado = false;
    

   }

  ngOnInit(): void {
    this.estadoObs.logueado$.subscribe(
      logueado => {this.logueado = logueado;}
    )

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
      
      sessionStorage.setItem('currentUser',JSON.stringify(payloads));//guardo en sessionStorage como string
      this.autenticacionService.currenUserSubject.next(payloads);
      
      this.estadoObs.logIn();

      this.rutas.navigate(['/porfolio'])
    })
  }

}
