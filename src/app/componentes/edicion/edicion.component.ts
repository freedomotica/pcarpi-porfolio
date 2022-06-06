import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {
  estadoApp!:IappEstado;
  suscription!:Subscription;
  
  constructor(private estadoObs:EstadoService) { }

  ngOnInit(): void {
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        console.log('edicion suscription',this.estadoApp);
        
        }
        
      )

    
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  
  

}
