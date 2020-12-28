import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {
  cityForm: FormGroup;

  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.cityForm = new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      continent: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  addCity() {
    this.adminService.addCity(this.cityForm.value).subscribe(response => {
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
}
