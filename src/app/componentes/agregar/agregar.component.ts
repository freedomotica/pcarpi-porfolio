import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  estadoApp!:IappEstado;
  suscription!:Subscription;
  
  @Output() addEvent = new EventEmitter<string>();
 
  
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
  
  newAddEvento(){
    this.addEvent.emit()
        
  }
 
  

}
