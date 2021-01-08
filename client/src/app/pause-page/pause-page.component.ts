import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { TripService } from '../_services/trip.service';

@Component({
  selector: 'app-pause-page',
  templateUrl: './pause-page.component.html',
  styleUrls: ['./pause-page.component.css']
})
export class PausePageComponent implements OnInit {
  user: User;
  id: number;

  constructor(private accountService: AccountService, private tripService: TripService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadId();
  }

  loadId() {
    this.tripService.getMaxTripId(this.user.id).subscribe(response => {
      this.id = response;
    });
  }


}
