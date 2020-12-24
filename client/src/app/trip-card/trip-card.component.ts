import { Component, Input, OnInit } from '@angular/core';
import { UserTrip } from '../_models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input() trip: UserTrip;
  constructor() { }

  ngOnInit(): void {
  }

}
