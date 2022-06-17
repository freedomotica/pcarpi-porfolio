import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
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
  
  estadoApp!:IappEstado;
  suscription!:Subscription
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;
  imagen = "";
  
  constructor(private datosPorfolio: PorfolioService, 
              private rutas: Router,
              private estadoObs:EstadoService,
              private renderer: Renderer2
              ) { 
                
                  this.datosPorfolio.obtenerDatos().subscribe(data=>{
                  this.miPorfolio = data;
                  this.imagen = 'data:image/jpg;base64,'+ data.avatar.imagen;
                  console.log(data);
                  
                  });
              }
  
  ngOnInit(): void {
    
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        
        console.log('navbar suscription',this.estadoApp);
        
        }
      )
    
    
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  editEvent1(){
    this.renderer.addClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','block');

    
  }

  deleteEvent1(){
    console.log('evento eliminar info personal');
    
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
                budge:this.miPorfolio.budge
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
