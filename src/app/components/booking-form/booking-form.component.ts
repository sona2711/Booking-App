import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';
import { ProductDataService } from '../../services/product-data.service';






@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class BookingFormComponent  implements OnInit{
  searchForm: FormGroup 

  capitalCities:string[] = [];
  options: number[] = [1, 2, 4, 5, 6]
  
  constructor(
    private fb: FormBuilder,  
    private router: Router,
    private dataService: ProductDataService) {4

      this.searchForm = this.fb.group({
        destination: ['', Validators.required],
        checkInDate: ['', Validators.required],
        checkOutDate: ['', Validators.required],
        guests: [1, [Validators.required, Validators.min(1)]]
      });;
    }

  ngOnInit(){

    this.dataService.loadCapitalCities().subscribe(capitals => {
      console.log(capitals)
    this.capitalCities = capitals.map(el => el.capital)
  })
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.router.navigate(["/search-list"], {queryParams: this.searchForm.value});
      console.log(this.searchForm.value)
    }
}
}
