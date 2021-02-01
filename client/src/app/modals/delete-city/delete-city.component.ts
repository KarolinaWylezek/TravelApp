import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { City } from 'src/app/_models/city';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.css']
})
export class DeleteCityComponent implements OnInit {
  @Input() deleteSelectedCity = new EventEmitter();
city: City;


  constructor(public bsModalRef: BsModalRef, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.deleteCity();
  }

  deleteCity() {
    this.adminService.deleteCity(this.city.name).subscribe();
    this.bsModalRef.hide();
  }

}
