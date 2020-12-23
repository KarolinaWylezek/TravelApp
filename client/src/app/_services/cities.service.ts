import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { City } from '../_models/city'
import { PaginatedResult } from '../_models/pagination';



@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  baseUrl = environment.apiUrl;
  cities: City[] = [];
  paginatedResult: PaginatedResult<City[]> = new PaginatedResult<City[]>();

  constructor(private http: HttpClient) { }

  getCities(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<City[]>(this.baseUrl + 'cities', {observe: 'response', params}).pipe(
     map(response => {
       this.paginatedResult.result = response.body;
       if(response.headers.get('Pagination') !== null) {
         this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
       }
       return this.paginatedResult;
     })
    );
  }

  getCity(name: string)  {
    const city = this.cities.find(x => x.name === name);
    if (city !== undefined) return of(city);
    return this.http.get<City>(this.baseUrl + 'cities/' + name);
  }
}
