import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private datosPorfolio: PorfolioService) { }
  miPorfolio:any;
  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      console.log(data);
      this.miPorfolio=data;
      
    });
  }

}
