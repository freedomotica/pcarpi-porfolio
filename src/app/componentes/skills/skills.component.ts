import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription
  constructor(private datosPorfolio: PorfolioService,
              private estadoObs: EstadoService ) {
    
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
  editEvent1(){
    console.log('edit evento 1 skill');
    
  }

  deleteEvent1(){
    console.log('evento 1 eliminar skill');
    
  }
  editEvent2(){
    console.log('edit evento 2 skill');
    
  }

  deleteEvent2(){
    console.log('evento eliminar 2 skill');
    
  }
}
