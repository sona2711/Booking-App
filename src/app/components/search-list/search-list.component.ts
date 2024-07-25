import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';


import { ProductDataService } from '../../services/product-data.service';
import { IHotel } from '../../../Interface/hotel';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
})
export class SearchListComponent implements OnInit{

searchList:IHotel[] = []
filteredList = []

popularFilters = this._formBuilder.group({
  stars: false,
  hotels: false,
  freeWifi: false,
});

facilities = this._formBuilder.group({
  wifi: false,
  pool: false,
  spa: false,
  parking: false,
  gym: false,
});

propertyType = this._formBuilder.group({
  hotel: false,
  motel: false,
  resort: false,
  hostel: false,
});

propertyRating = this._formBuilder.group({
  stars_1: false,
  stars_2: false,
  stars_3: false,
  stars_4: false,
  stars_5: false,
});

reviewScore = this._formBuilder.group({
  wonderful: false,
  veryGood: false,
  good: false,
  pleasant: false,
});

distanceFrom = this._formBuilder.group({
  lessThan1Km: false,
  lessThan3Km: false,
  lessThan5Km: false,
});

funThings = this._formBuilder.group({
  tennisCourt: false,
  fishing: false,
  skiing: false,
  casino: false,
  poolTable: false,
  hotTub: false,
  hiking: false,
  bowling: false,
  horsebackRiding: false,
  bicycleRental: false,
  sauna: false,
  fitnessCenter: false,
  gameRoom: false,
  spa: false,
});

propertyAccessibility = this._formBuilder.group({
  toiletWithGrabRails: false,
  raisedToilet: false,
  loweredSink: false,
  auditoryGuidance: false,
});

roomAccessibility = this._formBuilder.group({
  entireUnitLocatedOnGroundFloor: false,
  rollInShower: false,
  walkInShower: false,
  raisedToilet: false,
  lowerSink: false,
});

constructor(
  private dataService: ProductDataService,
   private _formBuilder: FormBuilder,
   formsModule: FormsModule,
   reactiveFormsModule: ReactiveFormsModule,
   private router: ActivatedRoute,
){
    this.searchList = this.dataService.createDb()
  }

ngOnInit(): void {
  this.router.queryParams.subscribe(params => {
    const destination = params['destination']
    const checkInDate = params['checkInDate']
    const checkOutDate = params['checkOutDate']
    const guests = params['guests']


    this.searchList = this.dataService.getFilteredHotels(destination, checkInDate, checkOutDate, guests)
  });

}

}
