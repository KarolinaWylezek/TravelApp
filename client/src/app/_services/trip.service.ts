import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Subcategory } from '../_models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

  getSubcategories(catId: number) {
    return this.http.get<Subcategory[]>(this.baseUrl + 'categories/' + catId);
  }

  createTrip(model: any) {
    return this.http.post(this.baseUrl + 'trips/' + 'new-trip', model);
  }
}
