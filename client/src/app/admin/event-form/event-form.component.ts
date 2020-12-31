import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/_models/city';
import { AdminService } from 'src/app/_services/admin.service';
import { CitiesService } from 'src/app/_services/cities.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  city: City;

  constructor(private adminService: AdminService, private cityService: CitiesService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCity();
  }

  initializeForm() {
    this.eventForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      finishTime: new FormControl('', Validators.required),
      theme: new FormControl('', Validators.required),
      subtheme: new FormControl('', Validators.required),
      expectedTimeSpent: new FormControl('', Validators.required),
    })
  }

  addEvent() {
    this.adminService.addEvent(this.eventForm.value, this.city.id).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancel() {
    this.adminService.cancel();
  }

  loadCity() {
    this.cityService.getCity(this.route.snapshot.paramMap.get('name')).subscribe(city => {
      this.city = city;
    })
  }

}