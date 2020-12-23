import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CitiesListComponent } from './cities/cities-list/cities-list.component';
import { CityDetailsComponent } from './cities/city-details/city-details.component';
import { TripsComponent } from './trips/trips.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from './_modules/shared.module';
import { CityCardComponent } from './cities/city-card/city-card.component';
import { EditUsernameComponent } from './edit-username/edit-username.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    CitiesListComponent,
    CityDetailsComponent,
    TripsComponent,
    ProfileComponent,
    CityCardComponent,
    EditUsernameComponent,
    EditEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
