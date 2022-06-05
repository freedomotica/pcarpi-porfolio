import { Component, OnInit } from '@angular/core';
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
  constructor(private datosPorfolio: PorfolioService,
                      private estadoObs:EstadoService
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

}
