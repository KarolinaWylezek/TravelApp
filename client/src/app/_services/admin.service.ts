import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Place } from '../_models/place';
import { User } from '../_models/user';
import { Event } from '../_models/event';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  updateRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

  deleteCity(name: string) {
    return this.http.delete(this.baseUrl + 'cities/' + name);
  }

  addCity(model: any) {
    return this.http.post(this.baseUrl + 'cities/add-city', model);
  }

  cancel() {
    return this.router.navigateByUrl('/cities-panel');
  }

  getPlaces(cityId: number) {
    return this.http.get<Place[]>(this.baseUrl + 'places/' + cityId);
  }

  getPlace(id: number) {
    return this.http.get<Place>(this.baseUrl + 'places/place/' + id);
  }

  getEvents(cityId: number) {
    return this.http.get<Event[]>(this.baseUrl + 'events/' + cityId);
  }

  getEvent(id: number) {
    return this.http.get<Event>(this.baseUrl + 'events/event/' + id);
  }

  deletePlace(id: number) {
    return this.http.delete(this.baseUrl + 'places/delete-place/' + id);
  }

  deleteEvent(id: number) {
    return this.http.delete(this.baseUrl + 'events/delete-event/' + id);
  }

  addPlace(model: any, Cityid: number) {
    return this.http.post(this.baseUrl + 'places/' + Cityid + '/add-place/', model);
  }

  addEvent(model: any, CityId: number) {
    return this.http.post(this.baseUrl + 'events/' + CityId + '/add-event/', model);
  }

  updatePlace(place: Place) {
    return this.http.put(this.baseUrl + 'places/' + place.id, place);
  }

  updateEvent(event: Event) {
    return this.http.put(this.baseUrl + 'events/' + event.id, event);
  }
}
