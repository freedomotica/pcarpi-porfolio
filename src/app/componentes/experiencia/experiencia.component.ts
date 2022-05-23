import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miPorfolio:any;
  constructor(private datosPorfolio: PorfolioService ) {
    this.miPorfolio = [];
    this.datosPorfolio.obtenerDatos().subscribe(data =>{
      this.miPorfolio = data;
    })
   }

  ngOnInit(): void {
    
  }

}
