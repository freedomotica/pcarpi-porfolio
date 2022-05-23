import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skill:any;
  constructor(private datosPorfolio: PorfolioService ) {
    this.skill = [];
    this.datosPorfolio.obtenerDatos().subscribe(data =>{
    this.skill = data.skill;
    })
   }
  ngOnInit(): void {
  }

}
