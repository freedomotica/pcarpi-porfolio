import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
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
  suscription!:Subscription
  constructor(private datosPorfolio: PorfolioService,
              private estadoObs: EstadoService
              ) {

    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      this.miPorfolio = data;
    })
   }

  ngOnInit(): void {
    
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        console.log('experience suscription',this.estadoApp);
        
        }
      )
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }


}
