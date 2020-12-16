import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../_models/city'



@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<City[]>(this.baseUrl + 'cities');
  }

  getCity(name: string)  {
    return this.http.get<City>(this.baseUrl + 'cities/' + name);
  }
}
