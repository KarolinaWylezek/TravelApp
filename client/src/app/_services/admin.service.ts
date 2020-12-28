import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

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
}
