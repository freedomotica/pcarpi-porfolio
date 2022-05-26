import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private http:HttpClient) {}
   
   obtenerDatos():Observable<any>{
    return this.http.get(`${environment.urlApi}/buscar/porfolio`);
  }
}
