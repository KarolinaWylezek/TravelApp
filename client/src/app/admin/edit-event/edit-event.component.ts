import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { Event } from 'src/app/_models/event';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  event: Event;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private adminService: AdminService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent() {
    this.adminService.getEvent(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(event => {
      this.event = event;
    })
  }

  updateEvent() {
    this.adminService.updateEvent(this.event).subscribe(() => {
      this.toastr.success('Event updated successfully');
      this.editForm.reset(this.event);
    })
    
  }

  cancel() {
    this.adminService.cancel();
  }

}
