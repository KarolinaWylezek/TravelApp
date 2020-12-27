import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
    positionClass: 'toast-bottom-right'
    }),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    ToastrModule,
    PaginationModule,
    TabsModule,
    ModalModule
  ]
})
export class SharedModule { }
