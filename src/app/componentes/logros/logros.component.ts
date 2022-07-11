import {  Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent implements OnInit  {
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription
  constructor(private datosPorfolio:PorfolioService,
              private estadoObs:EstadoService
    ) { }

  ngOnInit(): void {
      this.datosPorfolio.obtenerDatos().subscribe(data=>{
        this.miPorfolio = data;
        //agrega propiedad active al primer proyecto para que funcione el carousel de bootstrap
        this.miPorfolio.proyectos[0].active = true
      })

      this.suscription = this.estadoObs.estadoApp$.subscribe(
        estadoApp =>{
          this.estadoApp = estadoApp;
          
          
          }
        )
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  

}
