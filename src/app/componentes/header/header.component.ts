import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  miPorfolio:ImiPorfolio = new MiPorfolio();
  
  estadoApp!:IappEstado;
  suscription!:Subscription
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MyModalAvatar") modalAvatar!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;
  fileImagen!:Blob;
  imageUrl?:string;
  base64:string = 'Base64...'
  imagen = "";
  
  constructor(private datosPorfolio: PorfolioService, 
              private rutas: Router,
              private estadoObs:EstadoService,
              private sanit: DomSanitizer,
              private renderer: Renderer2
              ) { 
                
                  this.datosPorfolio.obtenerDatos().subscribe(data=>{
                  this.miPorfolio = data;
                  this.imagen = 'data:image/jpg;base64,'+ data.avatar.imagen;
                  console.log(data);
                  
                  });
                 
              }
  
  ngOnInit(): void {
    
    this.suscription = this.estadoObs.estadoApp$.subscribe(
      estadoApp =>{
        this.estadoApp = estadoApp;
        
        }
      )
    
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  editEvent1(){
    this.renderer.addClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','block');

    
  }

  editEvent2(){
    this.renderer.addClass(this.modalAvatar.nativeElement,"show");
    this.renderer.setStyle(this.modalAvatar.nativeElement,'display','block');
            
  }

  deleteEvent1(){
    console.log('evento eliminar info personal');
    
  }

  modalHide(){
    this.renderer.removeClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','none');
  }

  modalAvatarHide(){
    this.renderer.removeClass(this.modalAvatar.nativeElement,"show");
    this.renderer.setStyle(this.modalAvatar.nativeElement,'display','none');
  }

  modalGuardar(){

    var body = {
                name:this.miPorfolio.name,
                position: this.miPorfolio.position,
                backImage:this.miPorfolio.backImage,
                ubicacion:this.miPorfolio.ubicacion,
                about:this.miPorfolio.about,
                budge:this.miPorfolio.budge,
                whatsapp:this.miPorfolio.whatsapp,
                facebook:this.miPorfolio.facebook,
                linkedin:this.miPorfolio.linkedin
              }
    var bodyJson = JSON.stringify(body);
        
    var id = this.miPorfolio.id
    this.datosPorfolio.newPersona(bodyJson,id).subscribe(data=>{
                  
                  console.log(data);
                  this.renderer.addClass(this.spinner.nativeElement,"visually-hidden")
                  
                  });
    this.renderer.removeClass(this.spinner.nativeElement,"visually-hidden")
    
  }
  fileOnChange(event:any){
    
    this.fileImagen = event.target.files[0];
    /* configuracion de la propiedad src de la etiqueta img del modal de modificacion de avatar */
    this.imageUrl = this.sanit.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileImagen)) as string;

  }

  
  modalAvatarGuardar(){
    
    this.datosPorfolio.updateAvatar(this.fileImagen,this.miPorfolio.avatar.id).subscribe(data=>{
      console.log(data);
      
      this.miPorfolio.avatar = data
      /* actualizo src de img del avatar del header */
      this.imagen = 'data:image/jpg;base64,'+ data.imagen;
      /* actualizo estado de porfolio para las subscripciones */
      this.datosPorfolio.updateMiPorfolio(this.miPorfolio)
      this.renderer.addClass(this.spinner.nativeElement,"visually-hidden")
    })
    this.renderer.removeClass(this.spinner.nativeElement,"visually-hidden")
  }

  convertFileToBase64(file:Blob){
    let reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    return new Promise((resolve,reject)=>{
      reader.onloadend = ()=>resolve(reader.result as string)
           
      reader.onerror = ()=>reject
    })

  }
}
