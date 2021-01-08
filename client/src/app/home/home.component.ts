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
      category: this.formBuilder.array([]),
      subcategory: this.formBuilder.array([])
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
  //       this.subcats = response;
  //   });
    
  // }

  onCheckboxChange(e) {
    const category: FormArray = this.tripForm.get('category') as FormArray;
    if (e.target.checked) {
      category.push(new FormControl(e.target.value));

    } else {
      let i: number = 0;
      category.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          category.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCheckboxChangeSub(e) {
    const subcategory: FormArray = this.tripForm.get('subcategory') as FormArray;
  
    if (e.target.checked) {
      subcategory.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      subcategory.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          subcategory.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  

  createTrip() {
      this.tripService.createTrip(this.tripForm.value).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      })
   
    }

    submitForm() {
      console.log(this.tripForm.value);
    }
  }
