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

searchList:IHotel[] = [];
filteredList:IHotel[] = [];

priceRange = this._formBuilder.group({
  priceFrom: 12,
  priceTo: 1500,
})


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
  apartament: false,
  villa: false,
});

propertyRating = this._formBuilder.group({
  star1: false,
  star2: false,
  star3: false,
  star4: false,
  star5: false,
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
   private route: ActivatedRoute,
){
    this.searchList = this.dataService.createDb()
  }

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const destination = params['destination'];
    const checkInDate = params['checkInDate'];
    const checkOutDate = params['checkOutDate'];
    const guests = params['guests'];
    const location = params['location'];
    const propertyType = params['propertyType'];

    console.log(params)
    if (destination && checkInDate && checkOutDate && guests){
    this.searchList = this.dataService.getFilteredHotels(destination, checkInDate, checkOutDate, guests)
    console.log(this.searchList)
    this.filteredList = [...this.searchList]
    console.log(this.filteredList)
    }
    if (location) {
      this.filterByLocation(location);
    }
    if (propertyType) {
      this.filterByPropertyType(propertyType)
    }
  });




  this.facilities.valueChanges.subscribe(() => this.getFilteredList());
  this.propertyRating.valueChanges.subscribe(() => this.getFilteredList());
  this.reviewScore.valueChanges.subscribe(() => this.getFilteredList());
  this.distanceFrom.valueChanges.subscribe(() => this.getFilteredList());
  this.funThings.valueChanges.subscribe(() => this.getFilteredList());
  this.propertyAccessibility.valueChanges.subscribe(() => this.getFilteredList());
  this.roomAccessibility.valueChanges.subscribe(() => this.getFilteredList());

}

getFilteredList(){
  this.filteredList = this.searchList.filter((hotel: IHotel) => {
    return (
      this.checkFilters(this.facilities.value, hotel.facilities) ||
      this.checkFilters(this.propertyType.value, hotel.propertyType) ||
      this.checkFilters(this.propertyRating.value, hotel.rating) ||
      this.checkFilters(this.reviewScore.value, hotel.reviewScore) ||
      this.checkFilters(this.distanceFrom.value, hotel.distanceFromDowntown) ||
      this.checkFilters(this.funThings.value, hotel.funThings) ||
      this.checkFilters(this.propertyAccessibility.value, hotel.accessibility) ||
      this.checkFilters(this.roomAccessibility.value, hotel.roomsAvailable)
    );
  });
  console.log(this.filteredList)
  return this.filteredList
}



checkFilters(filters: any, hotelAttributes: any): boolean {
  for (let key in filters) {
    if (filters[key]) {
      if (Array.isArray(hotelAttributes)) {
        if (!hotelAttributes.includes(key)) {
          return false;
        }
      } else {
        if (typeof hotelAttributes === 'string' || typeof hotelAttributes === 'number') {
          if (hotelAttributes.toString() !== key) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

filterByLocation(location: string): IHotel[] {
  this.searchList = this.dataService.createDb()

  this.filteredList = this.searchList.filter(hotel =>
  hotel.location.toLowerCase().trim() === location.toLowerCase().trim()
  
  );
  return this.filteredList;
}

filterByPropertyType(propertyType: string): IHotel[] {
  this.searchList = this.dataService.createDb()

  this.filteredList = this.searchList.filter(hotel => 
  hotel.propertyType.toLowerCase().trim() === propertyType.toLowerCase().trim());
  
  return this.filteredList;
}
}


