import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { CitiesPanelComponent } from './admin/cities-panel/cities-panel.component';
import { CityAttractionsComponent } from './admin/city-attractions/city-attractions.component';
import { CityFormComponent } from './admin/city-form/city-form.component';
import { EditEventComponent } from './admin/edit-event/edit-event.component';
import { EditPlaceComponent } from './admin/edit-place/edit-place.component';
import { EventFormComponent } from './admin/event-form/event-form.component';
import { PlaceFormComponent } from './admin/place-form/place-form.component';
import { CitiesListComponent } from './cities/cities-list/cities-list.component';
import { CityDetailsComponent } from './cities/city-details/city-details.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { EditUsernameComponent } from './edit-username/edit-username.component';
import { HomeComponent } from './home/home.component';
import { PausePageComponent } from './pause-page/pause-page.component';
import { ProfileComponent } from './profile/profile.component';
import { RatePlaceComponent } from './rate-place/rate-place.component';
import { RegisterComponent } from './register/register.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { ModeratorGuard } from './_guards/moderator.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'trips/:id', component: TripDetailsComponent},
      {path: 'trips', component: TripsComponent},
      {path: 'trip', component: TripComponent},
      {path: 'trip-created', component: PausePageComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'rate/:name', component: RatePlaceComponent},
      {path: 'profile/editusername', component: EditUsernameComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'profile/editemail', component: EditEmailComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'roles', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'add-city', component: CityFormComponent, canActivate: [AdminGuard]},
      {path: 'add-place/:name', component: PlaceFormComponent, canActivate: [ModeratorGuard]},
      {path: 'add-event/:name', component: EventFormComponent, canActivate: [ModeratorGuard]},
      {path: 'edit-place/:id', component: EditPlaceComponent, canActivate: [ModeratorGuard], canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'edit-event/:id', component: EditEventComponent, canActivate: [ModeratorGuard], canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'cities-panel', component: CitiesPanelComponent, canActivate: [ModeratorGuard]},
      {path: 'attractions/:name', component: CityAttractionsComponent, canActivate: [ModeratorGuard]},
    ]
  },
  {path: 'cities', component: CitiesListComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cities/:name', component: CityDetailsComponent},
  
  {path: '**', component: HomeComponent, pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
