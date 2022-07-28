import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { Subscription } from 'rxjs';
import { EstadoService } from 'src/app/servicios/estado.service';


@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit,  AfterViewInit, OnDestroy {
visibilitySpinner!:boolean
estadoApp!:IappEstado;
suscription!:Subscription;

  constructor(private title:Title,private estadoObs:EstadoService) {
    this.title.setTitle('Porfolio Web');
    
    
   }

  ngOnInit(): void {
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp => {this.estadoApp = estadoApp;}
    )
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  ngAfterViewInit(): void {

  }

}
