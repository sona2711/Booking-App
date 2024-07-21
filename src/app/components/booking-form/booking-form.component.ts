import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDataService } from '../../services/product-data.service';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';





@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class BookingFormComponent {
  searchForm: FormGroup = this.fb.group({
    destination: ['', Validators.required],
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
    guests: [1, [Validators.required, Validators.min(1)]]
  });;


  capitalCities:string[] = [];
  
  constructor(private fb: FormBuilder, private http: HttpClient, private dataService: ProductDataService) {}

  ngOnInit(){

    this.dataService.loadCapitalCities().subscribe(capitals => {
    this.capitalCities = capitals;
  })
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const searchData = this.searchForm.value;
      
    } else {
      console.log('Form is invalid');
    }
  }
}
