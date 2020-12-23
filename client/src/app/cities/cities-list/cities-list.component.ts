import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/_models/city';
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
  pageNumber = 1;
  pageSize = 3;

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.citiesService.getCities(this.pageNumber, this.pageSize).subscribe(response => {
      this.cities = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadCities();
  }

}
