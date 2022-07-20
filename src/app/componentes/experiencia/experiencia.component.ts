import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { Experience } from 'src/app/models/Experience';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription;
  experienceModal = new Experience();
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;

  constructor(private datosPorfolio: PorfolioService,
              private estadoObs: EstadoService,
              private renderer:Renderer2
              ) {

    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      this.miPorfolio = data;
    })
   }

  ngOnInit(): void {
    
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        
        
        }
      )
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  addEvent(){
    console.log('agregar  experiencia');
    
  }
  editEvent1(experience:any){

    this.renderer.addClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','block');
    this.experienceModal = experience
    console.log(this.experienceModal);
    

    
  }

  modalHide(){
    this.renderer.removeClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','none');
  }
  modalGuardar(){
   

    this.datosPorfolio.updateExperiencia(JSON.stringify(this.experienceModal),this.experienceModal.id).subscribe(data=>{
                  
                  console.log(data);
                  this.renderer.addClass(this.spinner.nativeElement,"visually-hidden")
                  
                  });
    this.renderer.removeClass(this.spinner.nativeElement,"visually-hidden")
    
  }

}
