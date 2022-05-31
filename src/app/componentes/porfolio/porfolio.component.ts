import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppEstado } from 'src/app/estado/app.estado';
import { IappEstado } from 'src/app/estado/Iapp.estado';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {



  constructor(private title:Title) {
    title.setTitle('Porfolio Web');
   }

  ngOnInit(): void {
    
  }

}
