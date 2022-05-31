import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPorfolio:any;
  estadoApp!:IappEstado;
  suscription!:Subscription
  constructor(private datosPorfolio: PorfolioService,
                      private estadoObs:EstadoService
              ) { }

  ngOnInit(): void {
    this.miPorfolio={}
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

}
