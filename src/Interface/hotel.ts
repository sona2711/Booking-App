import { IBooking } from "./booking";

export interface IHotel {
    id: number;
    name: string;
    location: string;
    roomsAvailable: number;
    rating: number;               
    facilities: string[];        
    propertyType: string;       
    distanceFromDowntown: number; 
    reviewScore: number;          
    accessibility: string[];
    funThings: string[];
    img: string[];
    availableFrom: string;
    availableTo: string;
    price: number| null;
    bookings?: IBooking[];
    mapUrl?: string
}


export interface IData {
    capital: string,
    mapUrl: string

}
