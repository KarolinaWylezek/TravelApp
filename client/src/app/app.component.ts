import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Travel App';
  cities: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.http.get('https://localhost:5001/api/cities').subscribe(response => {
      this.cities = response;
    }, error => {
      console.log(error);
    })
  }
}
