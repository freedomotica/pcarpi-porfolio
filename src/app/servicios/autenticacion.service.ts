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
      sessionStorage.setItem('currentUser',JSON.stringify(data));
      this.currenUserSubject.next(data);
      return data;
    }))
   }

   get UsuarioAutenticado() {
      return this.currenUserSubject.value;
   }
}
