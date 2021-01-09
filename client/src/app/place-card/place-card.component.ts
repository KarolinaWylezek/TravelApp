import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Place } from '../_models/place';
import { CitiesService } from '../_services/cities.service';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {
  @Input() place: Place;
  placeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private citiesController: CitiesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.placeForm = this.formBuilder.group({
      grade: new FormControl('')
    })
  }

  submitForm() {
    console.log(this.placeForm.value);
  }

  ratePlace() {
    this.citiesController.ratePlace(this.place.id, this.placeForm.value).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

}