import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { City } from '../_models/city'
import { CityParams } from '../_models/cityParams';
import { PaginatedResult } from '../_models/pagination';



@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  baseUrl = environment.apiUrl;
  cities: City[] = [];
  

  constructor(private http: HttpClient) { }

  getCities(cityParams: CityParams) {
    let params = this.getPaginationHeaders(cityParams.pageNumber, cityParams.PageSize);

    params = params.append('selectedCountry', cityParams.selectedCountry);

    return this.getPaginatedResult<City[]>(this.baseUrl + 'cities', params);
  }

  getCity(name: string)  {
    const city = this.cities.find(x => x.name === name);
    if (city !== undefined) return of(city);
    return this.http.get<City>(this.baseUrl + 'cities/' + name);
  }

  getCountries(cityParams: CityParams) {
    return this.http.get<string[]>(this.baseUrl + 'countries');
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
