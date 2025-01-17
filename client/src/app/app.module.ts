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
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { CitiesPanelComponent } from './admin/cities-panel/cities-panel.component';
import { AddAttractionComponent } from './admin/add-attraction/add-attraction.component';
import { AddCityComponent } from './admin/add-city/add-city.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { DeleteCityComponent } from './modals/delete-city/delete-city.component';
import { CityFormComponent } from './admin/city-form/city-form.component';
import { CityAttractionsComponent } from './admin/city-attractions/city-attractions.component';
import { DeletePlaceComponent } from './modals/delete-place/delete-place.component';
import { DeleteEventComponent } from './modals/delete-event/delete-event.component';
import { EventFormComponent } from './admin/event-form/event-form.component';
import { PlaceFormComponent } from './admin/place-form/place-form.component';
import { EditPlaceComponent } from './admin/edit-place/edit-place.component';
import { EditEventComponent } from './admin/edit-event/edit-event.component';
import { TripComponent } from './trip/trip.component';
import { PausePageComponent } from './pause-page/pause-page.component';
import { RatePlaceComponent } from './rate-place/rate-place.component';
import { PlaceCardComponent } from './place-card/place-card.component';

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
    EditEmailComponent,
    TripCardComponent,
    TripDetailsComponent,
    AdminPanelComponent,
    HasRoleDirective,
    CitiesPanelComponent,
    AddAttractionComponent,
    AddCityComponent,
    RolesModalComponent,
    DeleteCityComponent,
    CityFormComponent,
    CityAttractionsComponent,
    DeletePlaceComponent,
    DeleteEventComponent,
    EventFormComponent,
    PlaceFormComponent,
    EditPlaceComponent,
    EditEventComponent,
    TripComponent,
    PausePageComponent,
    RatePlaceComponent,
    PlaceCardComponent
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
