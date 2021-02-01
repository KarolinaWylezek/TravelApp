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
  cityCache = new Map();
  cityParams: CityParams;
  city: City;
  

  constructor(private http: HttpClient) {
    this.cityParams = new CityParams();
   }

   getCityParams() {
     return this.cityParams;
   }

   setCityParams(params: CityParams) {
     this.cityParams = params;
   }

   resetCityParams() {
     this.cityParams = new CityParams();
     return this.cityParams;
   }

  getCities(cityParams: CityParams) {

    var response = this.cityCache.get(Object.values(cityParams).join('-'));
    if(response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(cityParams.pageNumber, cityParams.PageSize);

    params = params.append('selectedCountry', cityParams.selectedCountry);

    return this.getPaginatedResult<City[]>(this.baseUrl + 'cities', params).pipe(map(response => {
      this.cityCache.set(Object.values(cityParams).join('-'), response);
      return response;
    }))
  }

  getCitiesToChoose() {
    return this.http.get<City[]>(this.baseUrl + 'cities/choose');
  }

  getCity(name: string)  {
    const city = [...this.cityCache.values()].reduce((arr, elem) => arr.concat(elem.result), []).find((city: City) => city.name === name);

    if(city) {
      return of(city);
    }
  
    return this.http.get<City>(this.baseUrl + 'cities/' + name);
  }

  getCountries(cityParams: CityParams) {
    return this.http.get<string[]>(this.baseUrl + 'countries');
  }

  ratePlace(placeId: number, model: any) {
    return this.http.post(this.baseUrl + 'places/rate/' + placeId, model);
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
