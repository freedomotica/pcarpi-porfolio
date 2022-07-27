import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { Educacion } from 'src/app/models/Educacion';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription;
  educacionModal = new Educacion();
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;
  @ViewChild("file") file!: ElementRef;
  fileImagen!:Blob;
  imageUrl?:string;
   
  form = new FormGroup({
    school : new FormControl(),
    title : new FormControl(),
    career : new FormControl(),
    score : new FormControl(),
    dateStart : new FormControl(),
    dateEnd : new FormControl(),
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
                  this.miPorfolio.educacion.map((exp,indice)=>{
                    if(exp.imagen){
                      this.miPorfolio.educacion[indice].srcImagen = 'data:image/jpg;base64,'+ exp.imagen
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
    var edu = new Educacion();
    edu.school = 'school';
    edu.title = 'title';
    edu.career = 'career';
    edu.dateStart = 'dateStart';
    edu.dateEnd = 'dateEnd';
    edu.imagen!

    this.datosPorfolio.newEducacion(edu).subscribe(data=>{
      /* actualizo para renderizar nueva item experience */
      this.miPorfolio.educacion.push(data)
      
    });
    
  }
  editEvent1(educacion:any){

    this.renderer.addClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','block');
    this.educacionModal = educacion
    this.form.patchValue({
                school: this.educacionModal.school,
                score: this.educacionModal.score,
                title: this.educacionModal.title,
                career: this.educacionModal.career,
                dateStart:this.educacionModal.dateStart,
                dateEnd:this.educacionModal.dateEnd
               
              });
    this.imageUrl = educacion.srcImagen;
  }
  deleteEvent(educacion:any){
    this.datosPorfolio.deleteEducacion(educacion.id).subscribe(data=>{
      let experBorrar = 0
      this.miPorfolio.educacion.forEach((elem,indice)=>{
        if(elem.id==educacion.id){
          experBorrar = indice
        }
      })
      let datoBorrado = this.miPorfolio.educacion.splice(experBorrar,1)
      console.log('educacion borrado',datoBorrado);
      
    })
    
  }
  modalHide(){
    this.renderer.removeClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','none');
  }
  onEnviar(e:Event){
    e.preventDefault;
    var formData = new FormData()
    formData.append('school',this.form.get('school')?.value)
    formData.append('title',this.form.get('title')?.value)
    formData.append('career',this.form.get('career')?.value)
    formData.append('score',this.form.get('score')?.value)
    formData.append('dateStart',this.form.get('dateStart')?.value)
    formData.append('dateEnd',this.form.get('dateEnd')?.value)
    formData.append('imagen',this.fileImagen)
        
        
    this.datosPorfolio.updateEducacion(formData,this.educacionModal.id).subscribe(data=>{
                  
      this.renderer.addClass(this.spinner.nativeElement,"visually-hidden")
      
      this.miPorfolio.educacion.forEach((experience,index)=>{
        if (experience.id==data.id){
          this.miPorfolio.educacion[index]=data
          /* actualizo src de img del avatar del header */
       this.miPorfolio.educacion[index].srcImagen = 'data:image/jpg;base64,'+ data.imagen;
       
       
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
