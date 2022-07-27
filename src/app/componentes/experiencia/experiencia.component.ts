import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { Experience } from 'src/app/models/Experience';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription;
  experienceModal = new Experience();
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;
  @ViewChild("file") file!: ElementRef;
  fileImagen!:Blob;
  imageUrl?:string;
   
  form = new FormGroup({
    company : new FormControl(),
    position : new FormControl(),
    mode : new FormControl(),
    timeElapsed : new FormControl(),
    imagen : new FormControl()
  })

  constructor(private datosPorfolio: PorfolioService,
              private estadoObs: EstadoService,
              private renderer:Renderer2,
              private FormBuilder:FormBuilder,
              private sanit: DomSanitizer
              ) {
                        
                this.datosPorfolio.obtenerDatos().subscribe(data =>{
                  this.miPorfolio = data;

                  /* TODO  recorrer array de experience y convertir la imagen en  */
                  this.miPorfolio.experience.map((exp,indice)=>{
                    if(exp.imagen){
                      this.miPorfolio.experience[indice].srcImagen = 'data:image/jpg;base64,'+ exp.imagen
                    }
                  })
                })
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

  addEvent(){
    var exper = new Experience();
    exper.company = 'company';
    exper.position = 'position';
    exper.mode = 'mode';
    exper.timeElapsed = 'timeElapsed';
    exper.dateStart = 'dateStart';
    exper.dateEnd = 'dateEnd';
    exper.imagen!

    this.datosPorfolio.newExperiencia(exper).subscribe(data=>{
      /* actualizo para renderizar nueva item experience */
      this.miPorfolio.experience.push(data)
      
    });
    
  }
  editEvent1(experience:any){

    this.renderer.addClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','block');
    this.experienceModal = experience
    this.form.patchValue({
                company: this.experienceModal.company,
                mode: this.experienceModal.mode,
                position: this.experienceModal.position,
                timeElapsed:this.experienceModal.timeElapsed
               
              });
    this.imageUrl = experience.srcImagen;
  }
  deleteEvent(experience:any){
    this.datosPorfolio.deleteExperiencia(experience.id).subscribe(data=>{
      let experBorrar = 0
      this.miPorfolio.experience.forEach((elem,indice)=>{
        if(elem.id==experience.id){
          experBorrar = indice
        }
      })
      let datoBorrado = this.miPorfolio.experience.splice(experBorrar,1)
      console.log('Experience borrado',datoBorrado);
      
    })
    
  }
  modalHide(){
    this.renderer.removeClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','none');
  }
  onEnviar(e:Event){
    e.preventDefault;
    var formData = new FormData()
    formData.append('company',this.form.get('company')?.value)
    formData.append('position',this.form.get('position')?.value)
    formData.append('mode',this.form.get('mode')?.value)
    formData.append('timeElapsed',this.form.get('timeElapsed')?.value)
    formData.append('imagen',this.fileImagen)
        
        
    this.datosPorfolio.updateExperiencia(formData,this.experienceModal.id).subscribe(data=>{
                  
      this.renderer.addClass(this.spinner.nativeElement,"visually-hidden")
      
      this.miPorfolio.experience.forEach((experience,index)=>{
        if (experience.id==data.id){
          this.miPorfolio.experience[index]=data
          /* actualizo src de img del avatar del header */
       this.miPorfolio.experience[index].srcImagen = 'data:image/jpg;base64,'+ data.imagen;
       
       
        }
      })
       
      });
    this.renderer.removeClass(this.spinner.nativeElement,"visually-hidden")
    
  }

  fileOnChange(event:any){
        
    if(event.target.files.length!==0){
    this.fileImagen = event.target.files[0];
    /* configuracion de la propiedad src de la etiqueta img del modal de modificacion de avatar */
    this.imageUrl = this.sanit.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileImagen)) as string;
    }
           
  }
  srcImagen(fileImagen:any){
    return this.sanit.bypassSecurityTrustUrl(window.URL.createObjectURL(fileImagen)) as string;
  }

}
