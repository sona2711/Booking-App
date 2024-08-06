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
  priceFrom: 10,
  priceTo: 100,
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
    
    this.filteredList = [...this.searchList]
    }
    if (location) {
      this.filterByLocation(location);
    }
    if (propertyType) {
      this.filterByPropertyType(propertyType)
    }
  });




  this.priceRange.valueChanges.subscribe(() => this.filterByPrice());
  this.propertyType.valueChanges.subscribe(()=> this.filterByProperty())
  this.facilities.valueChanges.subscribe(() => this.filterByFacilities());
  this.propertyRating.valueChanges.subscribe(() => this.filterByPropertyRating());
  this.reviewScore.valueChanges.subscribe(() => this.filterByReviewScore());
  this.distanceFrom.valueChanges.subscribe(() => this.filterByDistanceFrom());
  this.funThings.valueChanges.subscribe(() => this.filterByFunThings());
  this.propertyAccessibility.valueChanges.subscribe(() => this.filterByPropertyAccessibility());
  this.roomAccessibility.valueChanges.subscribe(() => this.filterByRoomAccessibility());

}



filterByPrice() {
  const priceFrom: number | null = this.priceRange.controls['priceFrom'].value ?? 10;
  const priceTo: number | null  = this.priceRange.controls['priceTo'].value ?? 100;
  this.filteredList = this.searchList.filter(hotel => {
    const hotelPrice = hotel.price ?? 10
  return hotelPrice >= priceFrom && hotelPrice <= priceTo
  })
}

filterByFacilities() {
  const facilities: any = this.facilities.value;
  console.log(facilities)
  this.filteredList = this.searchList.filter(hotel => {
    const hasAllFacilities = Object.keys(facilities).every(facility => {
      return !facilities[facility] || hotel.facilities.includes(facility);
    });

    console.log(hasAllFacilities);
    
  return hasAllFacilities
})
};

filterByProperty() {
  const propertyTypes: any = this.propertyType.value;
  this.filteredList = this.searchList.filter(hotel => {
  return propertyTypes[hotel.propertyType] === true;
})
};

filterByPropertyRating() {
  const propertyRatings: any = this.propertyRating.value;
  this.filteredList = this.searchList.filter(hotel => {
  return propertyRatings[`star${hotel.rating}`] === true;
})
};

filterByReviewScore() {
  const reviewScores: any = this.reviewScore.value;
  this.filteredList = this.searchList.filter(hotel => {
  return reviewScores[hotel.reviewScore] === true;
})
};

filterByDistanceFrom() {
  const distanceFrom: any = this.distanceFrom.value;
  this.filteredList = this.searchList.filter(hotel => {
  return distanceFrom[`lessThan${hotel.distanceFromDowntown}Km`] === true;
})
};


filterByFunThings() {
  const funThings: any = this.funThings.value;
  this.filteredList = this.searchList.filter(hotel => {
  return Object.keys(funThings).every(thing => !funThings[thing] || hotel.funThings.includes(thing));
})
};


filterByPropertyAccessibility() {
  const propertyAccessibility: any  = this.propertyAccessibility.value;
  this.filteredList = this.searchList.filter(hotel => {
  return Object.keys(propertyAccessibility).every(accessibility => !propertyAccessibility[accessibility] || hotel.accessibility.includes(accessibility));
})
};


filterByRoomAccessibility() {
  const roomAccessibility: any  = this.roomAccessibility.value;
  this.filteredList = this.searchList.filter(hotel => {
  return Object.keys(roomAccessibility).every(accessibility => !roomAccessibility[accessibility] || hotel.accessibility.includes(accessibility));
})
};


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


