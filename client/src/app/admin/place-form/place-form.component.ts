import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/_models/city';
import { AdminService } from 'src/app/_services/admin.service';
import { CitiesService } from 'src/app/_services/cities.service';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {
  placeForm: FormGroup;
  city: City;

  constructor(private adminService: AdminService, private cityService: CitiesService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCity();
  }

  initializeForm() {
    this.placeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      openTime: new FormControl('', Validators.required),
      closeTime: new FormControl('', Validators.required),
      theme: new FormControl('', Validators.required),
      subtheme: new FormControl('', Validators.required),
      expectedTimeSpent: new FormControl('', Validators.required),
    })
  }

  addPlace() {
    this.adminService.addPlace(this.placeForm.value, this.city.id).subscribe(response => {
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
