import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/_models/city';
import { CitiesService } from 'src/app/_services/cities.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {
  cities: City[];

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.citiesService.getCities().subscribe(cities => {
      this.cities = cities;
    })
  }

}
