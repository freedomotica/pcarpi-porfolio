import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-session',
  templateUrl: './inicio-session.component.html',
  styleUrls: ['./inicio-session.component.css']
})
export class InicioSessionComponent implements OnInit {
  form:FormGroup;
  constructor(private FormBuilder:FormBuilder) {
    this.form = this.FormBuilder.group(
      {
      user:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
   }

  ngOnInit(): void {
  }

  get User(){
    return this.form.get('user');
  }
  
  get Password(){
    return this.form.get('password');
  }

}
