import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AppEstado } from 'src/app/estado/app.estado';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  
  miPorfolio:any;
  botonLoginValue:string;
  suscription!:Subscription
  
  

  constructor(private datosPorfolio: PorfolioService, 
              private rutas: Router,
              private estadoObs:EstadoService
              ) { 

                
                this.miPorfolio={};
                this.botonLoginValue='L';
              }
  
  ngOnInit(): void {
   

    this.suscription = this.estadoObs.logueado$.subscribe(
      logueado =>{
        logueado? this.botonLoginValue='Logout': this.botonLoginValue='Login'
        }
      )

    
    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      this.miPorfolio=data;
      console.log(data);
     
    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  login(){
      if(this.botonLoginValue=='Login'){
      this.rutas.navigate(['/login'])
      }else{
        this.botonLoginValue='Login'
      }
    
  }

}
