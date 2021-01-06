import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../_models/category';
import { Subcategory } from '../_models/subcategory';
import { TripService } from '../_services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tripForm: FormGroup;
  cats: Category[];
  subcats: Subcategory[] = [];
  //chosenCats: Category[];

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private tripService: TripService) {
   }
  

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();

  }

  initializeForm() {
    this.tripForm = this.formBuilder.group({
      place: new FormControl('', Validators.required),
      tripDate: new FormControl('', Validators.required),
      tripFinishDate: new FormControl('', Validators.required),
      startOfSightseeing: new FormControl('', Validators.required),
      finishOfSightseeing: new FormControl('', Validators.required),
      checkArray: this.formBuilder.array([]),
      checkArraySubcat: this.formBuilder.array([])
    })
  }



  loadCategories() {
    this.tripService.getCategories().toPromise().then(response =>{
      this.cats = response;
      this.loadSubcategories();
    })
    
  }

  // loadCategories() {
  //   this.tripService.getCategories().toPromise().then(response =>{
  //     this.cats = response;
  //   })
    
  // }

  loadSubcategories() {
    this.cats.forEach(element => {
      this.tripService.getSubcategories(element.id).toPromise().then(response =>{
        this.subcats = this.subcats.concat(response);
    });
    
    })
  }

  // loadSubcategories(id: number) {
    
  //     this.tripService.getSubcategories(id).subscribe(response =>{
  //       this.subcats = this.subcats.concat(response);
  //   });
    
  // }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.tripForm.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCheckboxChangeSub(e) {
    const checkArraySubcat: FormArray = this.tripForm.get('checkArraySubcat') as FormArray;
  
    if (e.target.checked) {
      checkArraySubcat.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArraySubcat.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArraySubcat.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  createTrip() {
      console.log(this.tripForm);
   
    }

    submitForm() {
      console.log(this.tripForm.value);
      // this.checkArray.controls.forEach((item: FormControl) => {

      // }
    }
  }

  