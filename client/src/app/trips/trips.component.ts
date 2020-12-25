import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Trip } from '../_models/trip';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips: Partial<Trip[]>;
  user: User;

  constructor(private usersService: UsersService, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips() {
    this.usersService.getTrips().subscribe(response => {
      this.trips = response;
    })
  }

}
