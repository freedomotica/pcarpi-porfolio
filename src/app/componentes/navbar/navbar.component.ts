import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';

import { MiPorfolio } from 'src/app/models/MiPorfolio';

import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  miPorfolio:ImiPorfolio = new MiPorfolio();
  
  botonLoginValue!:string;
  estadoApp!:IappEstado;
  suscription!:Subscription;
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;
  
  constructor(private datosPorfolio: PorfolioService, 
              private rutas: Router,
              private estadoObs:EstadoService,
              private renderer:Renderer2
              ) { 
                
                  this.datosPorfolio.obtenerDatos().subscribe(data=>{
                  this.miPorfolio = data;
                  
                  
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

  login(){
    if(this.estadoApp.logueado){
      this.estadoApp.logueado=false
      this.estadoObs.updateEstado(this.estadoApp);
    }else{
      this.rutas.navigate(['/login'])
    }
  
}
  editEvent1(){
    this.renderer.addClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','block');
    
  }

  deleteEvent1(){
    console.log('evento 1 eliminar navbar');
    
  }
  editEvent2(){
    console.log('edit evento 2 navbar');
    
  }

  deleteEvent2(){
    console.log('evento eliminar 2 navbar');
    
  }
  modalHide(){
    this.renderer.removeClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','none');
  }
  modalGuardar(){
    var body = {
      name:this.miPorfolio.name,
      position: this.miPorfolio.position,
      backImage:this.miPorfolio.backImage,
      ubicacion:this.miPorfolio.ubicacion,
      about:this.miPorfolio.about,
      budge:this.miPorfolio.budge,
      whatsapp:this.miPorfolio.whatsapp,
      facebook:this.miPorfolio.facebook,
      linkedin:this.miPorfolio.linkedin
      
    }
var bodyJson = JSON.stringify(body);

var id = this.miPorfolio.id
this.datosPorfolio.newPersona(bodyJson,id).subscribe(data=>{
        
        console.log(data);
        this.renderer.addClass(this.spinner.nativeElement,"visually-hidden")
        
        });
this.renderer.removeClass(this.spinner.nativeElement,"visually-hidden")
    
  }
}
