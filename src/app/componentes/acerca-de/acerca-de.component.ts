import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppEstado } from 'src/app/estado/app.estado';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;

  constructor(private datosPorfolio: PorfolioService,
                      private estadoObs:EstadoService,
                      private renderer:Renderer2
              ) { }

  ngOnInit(): void {
    
    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      this.miPorfolio=data;
    })

    
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        console.log('acerca-de suscription',this.estadoApp);
        
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
