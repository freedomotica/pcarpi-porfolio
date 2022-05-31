import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoService } from 'src/app/servicios/estado.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[EstadoService]
})
export class CoreModule { }
