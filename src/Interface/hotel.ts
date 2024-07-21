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
    img: string[];
}
