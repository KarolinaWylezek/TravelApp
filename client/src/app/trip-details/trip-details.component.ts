import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attraction } from '../_models/attraction';
import { Trip } from '../_models/trip';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
trip: Trip;
attractions: Attraction[];
  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTrip();
  }

  loadTrip() {
    this.userService.getTrip(this.route.snapshot.paramMap.get('id')).subscribe(trip => {
      this.trip = trip;
    })
  }

  loadAttractions() {
    this.userService.getAttractions().subscribe()
    })
  }

}
