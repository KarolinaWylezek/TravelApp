import { Component, OnInit } from '@angular/core';
import { UserTrip } from '../_models/trip';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips: Partial<UserTrip[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips() {
    this.usersService.getTrips().subscribe(response => {
      this.trips = response;
    })
  }

}
