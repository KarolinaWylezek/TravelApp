import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
    positionClass: 'toast-bottom-right'
    }),
    PaginationModule.forRoot()
  ],
  exports: [
    ToastrModule,
    PaginationModule
  ]
})
export class SharedModule { }
