import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/_models/place';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  place: Place;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private adminService: AdminService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadPlace();
  }

  loadPlace() {
    this.adminService.getPlace(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(place => {
      this.place = place;
    })
  }

  updatePlace() {
    this.adminService.updatePlace(this.place).subscribe(() => {
      this.toastr.success('Place updated successfully');
      this.editForm.reset(this.place);
    })
  }

  cancel() {
    this.adminService.cancel();
  }

}
