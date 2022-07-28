import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IappEstado } from 'src/app/estado/Iapp.estado';
import { Skill } from 'src/app/models/Skill';
import { ImiPorfolio } from 'src/app/models/ImiPorfolio';
import { MiPorfolio } from 'src/app/models/MiPorfolio';
import { EstadoService } from 'src/app/servicios/estado.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  miPorfolio:ImiPorfolio = new MiPorfolio();
  estadoApp!:IappEstado;
  suscription!:Subscription;
  skillModal = new Skill();
  @ViewChild("MyModal") modal!: ElementRef;
  @ViewChild("MySpinner") spinner!: ElementRef;
  @ViewChild("file") file!: ElementRef;
  fileImagen!:Blob;
  imageUrl?:string;
   
  form = new FormGroup({
    name : new FormControl(),
    progress : new FormControl(),
    type : new FormControl(),
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
                  this.miPorfolio.skill.map((exp,indice)=>{
                    if(exp.imagen){
                      this.miPorfolio.skill[indice].srcImagen = 'data:image/jpg;base64,'+ exp.imagen
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
    var skl = new Skill();
    skl.name = 'Skill';
    skl.progress = 50;
    skl.type = 'type';
    skl.imagen!

    this.datosPorfolio.newSkill(skl).subscribe(data=>{
      /* actualizo para renderizar nueva item experience */
      this.miPorfolio.skill.push(data)
      
    });
    
  }
  editEvent1(skill:any){

    this.renderer.addClass(this.modal.nativeElement,"show");
    this.renderer.setStyle(this.modal.nativeElement,'display','block');
    this.skillModal = skill
    this.form.patchValue({
                name: this.skillModal.name,
                type: this.skillModal.type,
                progress: this.skillModal.progress
                              
              });
    this.imageUrl = skill.srcImagen;
  }
  deleteEvent(skill:any){
    this.datosPorfolio.deleteSkill(skill.id).subscribe(data=>{
      let experBorrar = 0
      this.miPorfolio.skill.forEach((elem,indice)=>{
        if(elem.id==skill.id){
          experBorrar = indice
        }
      })
      let datoBorrado = this.miPorfolio.skill.splice(experBorrar,1)
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
    formData.append('name',this.form.get('name')?.value)
    formData.append('type',this.form.get('type')?.value)
    formData.append('progress',this.form.get('progress')?.value)
    
    formData.append('imagen',this.fileImagen)
        
        
    this.datosPorfolio.updateSkill(formData,this.skillModal.id).subscribe(data=>{
                  
      this.renderer.addClass(this.spinner.nativeElement,"visually-hidden")
      
      this.miPorfolio.skill.forEach((skill,index)=>{
        if (skill.id==data.id){
          this.miPorfolio.skill[index]=data
          /* actualizo src de img del avatar del header */
       this.miPorfolio.skill[index].srcImagen = 'data:image/jpg;base64,'+ data.imagen;
       
       
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

