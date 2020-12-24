import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/_models/city';
import { CityParams } from 'src/app/_models/cityParams';
import { Pagination } from 'src/app/_models/pagination';
import { CitiesService } from 'src/app/_services/cities.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {
  cities:City[];
  pagination: Pagination;
  cityParams: CityParams;
  countries: string[];

  constructor(private citiesService: CitiesService) { 
    this.cityParams = new CityParams();
  }

  ngOnInit(): void {
    this.loadCities();
    this.loadCountries();
  }

  loadCities() {
    this.citiesService.getCities(this.cityParams).subscribe(response => {
      this.cities = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.cityParams = new CityParams();
    this.loadCities();
  }

  pageChanged(event: any) {
    this.cityParams.pageNumber = event.page;
    this.loadCities();
  }

  loadCountries() {
    
   this.citiesService.getCountries(this.cityParams).subscribe(countries => {
     this.countries = countries;
   });
  }

}
