import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;

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
}


