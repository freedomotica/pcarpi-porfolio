import {  Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent implements OnInit  {
  proyectos:any;
  constructor(private datosPorfolio:PorfolioService) { }

  ngOnInit(): void {
    this.proyectos=[];
    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      console.log(data.proyectos);
      
      this.proyectos = data.proyectos;
      this.proyectos[0].active = true

    })
  }

  

}
