import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { CitiesPanelComponent } from './admin/cities-panel/cities-panel.component';
import { CityFormComponent } from './admin/city-form/city-form.component';
import { CitiesListComponent } from './cities/cities-list/cities-list.component';
import { CityDetailsComponent } from './cities/city-details/city-details.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { EditUsernameComponent } from './edit-username/edit-username.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
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
      {path: 'profile', component: ProfileComponent},
      {path: 'profile/editusername', component: EditUsernameComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'profile/editemail', component: EditEmailComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'roles', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'add-city', component: CityFormComponent, canActivate: [AdminGuard]},
      {path: 'cities-panel', component: CitiesPanelComponent, canActivate: [ModeratorGuard]},
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
