import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription

  constructor(private datosPorfolio:PorfolioService,
              private estadoObs:EstadoService
    ) {
        this.datosPorfolio.obtenerDatos().subscribe(data=>{
        this.miPorfolio=data;
        
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
    editEvent1(){
      console.log('edit evento 1 educacion');
      
    }
  
    deleteEvent1(){
      console.log('evento 1 eliminar educacion');
      
    }
    editEvent2(){
      console.log('edit evento 2 educacion');
      
    }
  
    deleteEvent2(){
      console.log('evento eliminar 2 educacion');
      
    }
}
