import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from '../../services/product-data.service';
import { IHotel } from '../../../Interface/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private dataService: ProductDataService,
    private router: Router,
  ){}

  ngOnInit(): void {
  }
  onCardClick(cardName: string): void {
    this.router.navigate(['/search-list'], { queryParams: {location: cardName } });
  }

  onPropertyClick(property: string): void {
    this.router.navigate(['/search-list'], { queryParams: {propertyType: property} });
  }
}
