import { Component, OnInit } from '@angular/core';

import { ProductDataService } from '../../services/product-data.service';
import { IHotel } from '../../../Interface/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  trendCityNames:IHotel[] = this.dataService.createDb()

  constructor(private dataService: ProductDataService){
  console.log(this.trendCityNames)
  }

  ngOnInit(): void {
  }

}
