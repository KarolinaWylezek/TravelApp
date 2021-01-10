import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Attraction } from '../_models/attraction';
import { Trip } from '../_models/trip';
import { TripService } from '../_services/trip.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
trip: Trip;
attractions: Attraction[];
  constructor(private userService: UsersService, private route: ActivatedRoute, private tripService: TripService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadTrip();
    this.loadAttractions();
  }

  loadTrip() {
    this.userService.getTrip(this.route.snapshot.paramMap.get('id')).subscribe(trip => {
      this.trip = trip;
    })
  }

  loadAttractions() {
    this.userService.getAttractions(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.attractions = response;
    })
    }

    checkAttraction(id: number) {
      this.tripService.checkAttraction(id).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      })
    }
  }

