import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  miPorfolio:ImiPorfolio = new MiPorfolio();
  botonLoginValue!:string;
  estadoApp!:IappEstado;
  suscription!:Subscription
  
  constructor(private datosPorfolio: PorfolioService, 
              private rutas: Router,
              private estadoObs:EstadoService
              ) { 
                
                  this.datosPorfolio.obtenerDatos().subscribe(data=>{
                  this.miPorfolio = data;
                  console.log(data);
                  
                  });
              }
  
  ngOnInit(): void {
    
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        this.estadoApp.logueado? this.botonLoginValue='Logout': this.botonLoginValue='Login'
        console.log('header suscription',this.estadoApp);
        
        }
      )
    
    
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  login(){
      if(this.estadoApp.logueado){
        this.estadoApp.logueado=false
        this.estadoObs.updateEstado(this.estadoApp);
      }else{
        this.rutas.navigate(['/login'])
      }
    
  }

}
