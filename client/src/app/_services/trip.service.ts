import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { PaginatedResult } from '../_models/pagination';
import { Place } from '../_models/place';
import { PlacesParams } from '../_models/placesParams';
import { Subcategory } from '../_models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  baseUrl = environment.apiUrl;
  placesParams: PlacesParams;
 

  constructor(private http: HttpClient) {
    this.placesParams = new PlacesParams();
   }

   getPlacesParams() {
    return this.placesParams;
  }

  setPlacesParams(params: PlacesParams) {
    this.placesParams = params;
  }

  resetPlacesParams() {
    this.placesParams = new PlacesParams();
    return this.placesParams;
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

  getSubcategories(catId: number) {
    return this.http.get<Subcategory[]>(this.baseUrl + 'categories/' + catId);
  }

  createTrip(model: any) {
    return this.http.post(this.baseUrl + 'trips/' + 'new-trip', model);
  }

  getMaxTripId(userId: number) {
    return this.http.get<number>(this.baseUrl + 'trips/' + userId + '/id');
  }

  getPlaces(cityId: number, placesParams: PlacesParams) {
    let params = this.getPaginationHeaders(placesParams.pageNumber, placesParams.PageSize);
    params = params.append('selectedCategory', placesParams.selectedCategory);
    return this.getPaginatedResult<Place[]>(this.baseUrl + 'places/paged/' + cityId, params);
  }

  getAllSubcategories() {
    return this.http.get<string[]>(this.baseUrl + 'categories/subcategories');
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
         paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    
      return params;
  }
}
//