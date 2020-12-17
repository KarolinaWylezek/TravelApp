import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/_models/city';
import { CitiesService } from 'src/app/_services/cities.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {
  city: City;

  constructor(private citiesService: CitiesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCity();
  }

  loadCity() {
    this.citiesService.getCity(this.route.snapshot.paramMap.get('name')).subscribe(city => {
      this.city = city;
    })
  }

}
