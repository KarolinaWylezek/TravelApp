import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Place } from 'src/app/_models/place';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-delete-place',
  templateUrl: './delete-place.component.html',
  styleUrls: ['./delete-place.component.css']
})
export class DeletePlaceComponent implements OnInit {
  @Input() deleteSelectedCity = new EventEmitter();
  place: Place;
  
  
    constructor(public bsModalRef: BsModalRef, private adminService: AdminService, private router: Router) { }
  
    ngOnInit(): void {
      this.deletePlace();
    }
  
    deletePlace() {
      this.adminService.deletePlace(this.place.id).subscribe();
      this.bsModalRef.hide();
    }
  
  }
