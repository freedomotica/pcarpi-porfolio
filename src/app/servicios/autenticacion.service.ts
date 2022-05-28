import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url = environment.urlApi+'/login';
  currenUserSubject: BehaviorSubject<any>;
  constructor(private http:HttpClient) {
      console.log('AutenticacionService corriendo');
      this.currenUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
   }

   IniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.url,credenciales).pipe(map(data =>{
      
      return data;
    }))
   }

   //  trae los datos del sessionStorage como objeto
   get UsuarioAutenticado() {
      return this.currenUserSubject.value;
   }
}
