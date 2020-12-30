import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/_models/city';
import { Place } from 'src/app/_models/place';
import { Event } from 'src/app/_models/event';
import { AdminService } from 'src/app/_services/admin.service';
import { CitiesService } from 'src/app/_services/cities.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeletePlaceComponent } from 'src/app/modals/delete-place/delete-place.component';
import { DeleteEventComponent } from 'src/app/modals/delete-event/delete-event.component';

@Component({
  selector: 'app-city-attractions',
  templateUrl: './city-attractions.component.html',
  styleUrls: ['./city-attractions.component.css']
})
export class CityAttractionsComponent implements OnInit {
  city: City;
  places: Place[];
  events: Event[];
  place: Place;
  bsModalRef: BsModalRef;
 

  constructor(private citiesService: CitiesService, private route: ActivatedRoute, private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadCity();
  
  }

  loadCity() {
    this.citiesService.getCity(this.route.snapshot.paramMap.get('name')).subscribe(city => {
      this.city = city;
    })
  }

  loadPlaces() {
    this.adminService.getPlaces(this.city.id).subscribe(response => {
      this.places = response;
    });
  }

  loadEvents() {
    this.adminService.getEvents(this.city.id).subscribe(response => {
      this.events = response;
    })
  }

  openPlaceModal(place: Place) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        place
      }
    }
    this.bsModalRef = this.modalService.show(DeletePlaceComponent, config);
  }

  openEventModal(event: Event) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        event
      }
    }
    this.bsModalRef = this.modalService.show(DeleteEventComponent, config);
  }

  refreash() {
    window.location.reload();
  }

}
