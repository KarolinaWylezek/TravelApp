import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EditUsernameComponent } from '../edit-username/edit-username.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: EditUsernameComponent): boolean {
    if(component.editForm.dirty) {
      return confirm('Do you ant to continue? All changes will be lost')
    }
    return true;
  }
  
}
