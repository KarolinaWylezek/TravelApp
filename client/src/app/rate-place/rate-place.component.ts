import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from '../_models/city';
import { Pagination } from '../_models/pagination';
import { Place } from '../_models/place';
import { PlacesParams } from '../_models/placesParams';
import { Subcategory } from '../_models/subcategory';
import { CitiesService } from '../_services/cities.service';
import { TripService } from '../_services/trip.service';

@Component({
  selector: 'app-rate-place',
  templateUrl: './rate-place.component.html',
  styleUrls: ['./rate-place.component.css']
})
export class RatePlaceComponent implements OnInit {
  city: City;
  places: Place[];
  pagination: Pagination;
  placesParams: PlacesParams;
  subcategories: string[];

  constructor(private tripService: TripService, private cityService: CitiesService, private route: ActivatedRoute) { 
    this.placesParams = this.tripService.getPlacesParams();
  }

  ngOnInit(): void {
    this.loadCity();
    this.loadSubcategories();
  }

  loadPlaces() {
    this.tripService.setPlacesParams(this.placesParams);
    this.tripService.getPlaces(this.city.id, this.placesParams).subscribe(response => {
      this.places = response.result;
      this.pagination = response.pagination;
    })
  }

  loadCity() {
    this.cityService.getCity(this.route.snapshot.paramMap.get('name')).toPromise().then(response =>{
      this.city = response;
      this.loadPlaces();
    })
     
  }

 pageChanged(event: any) {
   this.placesParams.pageNumber = event.page;
   this.tripService.setPlacesParams(this.placesParams);
   this.loadPlaces();
 }

 loadSubcategories() {
   this.tripService.getAllSubcategories().subscribe(response => {
     this.subcategories = response;
   })
 }

 resetFilters() {
  this.placesParams = this.tripService.resetPlacesParams();
  this.loadPlaces();
}

}
