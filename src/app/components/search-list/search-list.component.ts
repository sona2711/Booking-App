import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {JsonPipe} from '@angular/common';
import { ProductDataService } from '../../services/product-data.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
})
export class SearchListComponent implements OnInit{
constructor(
  productList: ProductDataService,
   chechbox: MatCheckboxModule,
  //  JsonPipe: JsonPipe,
   private _formBuilder: FormBuilder,
   formsModule: FormsModule,
   reactiveFormsModule: ReactiveFormsModule

  ) {}
searchList = []
popularFilters = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});
facilities = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});
propertyType = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});
propertyRating = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});
reviewScore = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});
distanceFrom = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});
funThings = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});
roomAccessibility = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});

ngOnInit(): void {
  
}

}
