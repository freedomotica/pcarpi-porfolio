import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
isLoading!:boolean
  constructor() { }
  spinnerShow():void{this.isLoading = true}
  spinnerHide():void{this.isLoading = false}
}
