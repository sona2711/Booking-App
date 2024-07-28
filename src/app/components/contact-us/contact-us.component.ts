import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit{
  contactUs = this._formBuilder.group({
    email: '',
    option: '',
    message: '',
  })
  constructor(
    private _formBuilder: FormBuilder,
   formsModule: FormsModule,
   reactiveFormsModule: ReactiveFormsModule,){}
  ngOnInit(): void {
  
  }
  submitMessage(){}
}
