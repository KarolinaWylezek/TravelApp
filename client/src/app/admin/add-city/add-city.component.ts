import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteCityComponent } from 'src/app/modals/delete-city/delete-city.component';
import { City } from 'src/app/_models/city';
import { CityParams } from 'src/app/_models/cityParams';
import { Pagination } from 'src/app/_models/pagination';
import { CitiesService } from 'src/app/_services/cities.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  cities: City[];
  pagination: Pagination;
  cityParams: CityParams;
  countries: string[];
  bsModalRef: BsModalRef;
  city: City;

  constructor(private citiesService: CitiesService, private modalService: BsModalService, private httpClient: HttpClient) {
    this.cityParams = this.citiesService.getCityParams();
  }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.citiesService.setCityParams(this.cityParams);
    this.citiesService.getCities(this.cityParams).subscribe(response => {
      this.cities = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.cityParams.pageNumber = event.page;
    this.citiesService.setCityParams(this.cityParams);
    this.loadCities();
  }

  openCitiesModal(city: City) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        city
      }
    }
    this.bsModalRef = this.modalService.show(DeleteCityComponent, config);
  }

  refreash() {
    window.location.reload();
  }
}
