import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Event } from 'src/app/_models/event';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  @Input() deleteSelectedCity = new EventEmitter();
  event: Event;
  
  
    constructor(public bsModalRef: BsModalRef, private adminService: AdminService, private router: Router) { }
  
    ngOnInit(): void {
      this.deleteEvent();
    }
  
    deleteEvent() {
      this.adminService.deleteEvent(this.event.id).subscribe();
      this.bsModalRef.hide();
    }
  
  }
