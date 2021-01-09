import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
//import {RatingModule} from "ngx-rating";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
    positionClass: 'toast-bottom-right'
    }),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot()
  ],
  exports: [
    ToastrModule,
    PaginationModule,
    TabsModule,
    ModalModule,
    RatingModule
  ]
})
export class SharedModule { }
