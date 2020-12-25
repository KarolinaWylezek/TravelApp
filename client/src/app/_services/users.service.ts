import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Attraction } from '../_models/attraction';
import { Member } from '../_models/member';
import { Trip } from '../_models/trip';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  trip: Trip;
  trips: Trip[] = [];

  constructor(private http: HttpClient) { }

  getUSers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getUser(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateUser(member: Member) {
    return this.http.put(this.baseUrl + 'users', member);
  }

  getTrips() {
    return this.http.get<Partial<Trip[]>>(this.baseUrl + 'trips');
  }

  getTrip(id: string) {
    return this.http.get<Trip>(this.baseUrl + 'trips/' + id)
  }

  getAttractions(id: string) {
    return this.http.get<Attraction>(this.baseUrl + 'attractions/' + id)
  }
}
