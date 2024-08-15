import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHotel , IData} from '../../Interface/hotel';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IBooking } from '../../Interface/booking';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private hotels!: IHotel[];
  capitalCities: IData[] = [];
  private cityUrl = "https://restcountries.com/v3.1/all";

   bookings: IBooking[]= [
    { id: 1, name: 'John Doe', hotelId: 1, date: '2024-06-20' },
    { id: 2, name: 'Jane Smith', hotelId: 2, date: '2024-06-22' },
  ];
  
  constructor(private http: HttpClient) {
    this.loadCapitalCities().pipe(
      switchMap(capitals => {
        this.capitalCities = capitals;
        console.log('Capital Cities Set:', this.capitalCities);
        return of(this.createDb());
      })
    ).subscribe(hotels => {
      this.hotels = hotels;
      console.log('Hotels Generated:', this.hotels);
    });
  }

   
  
  loadCapitalCities(): Observable<IData[]> {
    return this.http.get<any[]>(this.cityUrl).pipe(
      map(data => 
        data
          .filter(country => country.capital && country.capital.length > 0 && country.maps?.googleMaps)
          .map(country => ({
            capital: country.capital[0],
            mapUrl: country.maps.googleMaps
          }))
          .sort((a, b) => a.capital.localeCompare(b.capital))
      )
    );
  }
  

  createDb() {
    const hotels: IHotel[] = this.generateHotels(1000);
    return hotels;
  }

  generateHotels(count: number): IHotel[] {
    const hotels: IHotel[] = [];
    const facilities = ['Free Wifi', 'Pool', 'Parking', 'Gym', 'Spa'];
    const propertyTypes = ['Hotel', 'Motel', 'Resort', 'Hostel', 'Apartament', 'Villa'];
    const accessibilityFeatures = ['Wheelchair accessible', 'Braille signage', 'Elevator access'];
    const funThings = ["tennisCourt","fishing","skiing","casino","poolTable","hotTub","hiking","bowling","horsebackRiding","bicycleRental","sauna","fitnessCenter","gameRoom","spa"]
    const hotelImg = [
      '../../../assets/images/1.2.jpg', '../../../assets/images/1.jpg', '../../../assets/images/10.jpg',
      '../../../assets/images/2.jpg', '../../../assets/images/11.jpg', '../../../assets/images/12.jpg',
      '../../../assets/images/13.jpg', '../../../assets/images/14.jpg', '../../../assets/images/15.jpg',
      '../../../assets/images/16.jpg', '../../../assets/images/16.1.jpg', '../../../assets/images/3.jpg',
      '../../../assets/images/4.jpg', '../../../assets/images/5.jpg', '../../../assets/images/6.jpg',
      '../../../assets/images/7.jpg', '../../../assets/images/8.jpg', '../../../assets/images/9.jpg',
      '../../../assets/images/18.jpg', '../../../assets/images/19.jpg', '../../../assets/images/17.jpg'
    ];

    
    for (let i = 1; i <= count; i++) {
      const availableFrom = this.getRandomDate(new Date(2024,6,1), new Date(2024,9,31));
      const availableTo = this.getRandomDate(availableFrom, new Date(availableFrom.getFullYear(), availableFrom.getMonth()+ 1, availableFrom.getDate()));
      const { city, mapUrl } = this.getCityName();


      hotels.push({
        id: i,
        name: `Hotel ${i}`,
        location: city,
        roomsAvailable: Math.floor(Math.random() * 100) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        facilities: this.getRandomElements(facilities),
        propertyType: this.getRandomElement(propertyTypes),
        distanceFromDowntown: parseFloat((Math.random() * 20).toFixed(2)),
        reviewScore: parseFloat((Math.random() * 10).toFixed(2)),
        accessibility: this.getRandomElements(accessibilityFeatures),
        funThings: this.getRandomElements(funThings),
        img: this.getHotelImg(hotelImg),
        availableFrom: availableFrom.toISOString().split('T')[0],
        availableTo: availableTo.toISOString().split('T')[0],
        price: Math.floor(Math.random()*100)+1,
        bookings: [],
        mapUrl: mapUrl
      });
    }
    return hotels;
  }

  getRandomElement(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getRandomElements(arr: string[]): string[] {
    return arr.filter(() => Math.random() > 0.5);
  }

  // getCityName(): string {
  //   if (this.capitalCities.length === 0) return 'Unknown City';
  //   return this.capitalCities[Math.floor(Math.random() * this.capitalCities.length)];
  // }

  getCityName(): { city: string, mapUrl: string } {
    if (this.capitalCities.length === 0) {
      return { city: 'Unknown City', mapUrl: '' };
    }
  
    const randomCity = this.capitalCities[Math.floor(Math.random() * this.capitalCities.length)];
    return { city: randomCity.capital, mapUrl: randomCity.mapUrl };
  }
  
  getHotelImg(arr: string[], num: number = 3): string[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  getRandomDate(start: Date, end: Date): Date {
    const date = new Date(start.getTime()+ Math.random() * (end.getTime() - start.getTime()))
    return date;
  }

  getFilteredHotels(destination:string, checkInDate:string, checkOutDate: string, guests: string){
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    return this.hotels.filter(el => 
      el.location === destination && el.roomsAvailable >= Number(guests) && !el.bookings?.some(booking => {
        const bookingDate = new Date(booking.date);
        return (bookingDate >= checkIn && bookingDate <= checkOut);
      })
    )
  }
}








