import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css']
})
export class EditEmailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  member: Member;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private usersService: UsersService, private toastr: ToastrService, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadUser();
  }

loadUser()
{
  this.usersService.getUser(this.user.username).subscribe(member => {
    this.member = member;
  })
}

updateEmail() {
  this.usersService.updateUser(this.member).subscribe(() => {
    this.toastr.success('Email updated');
    this.editForm.reset(this.member);
    this.router.navigateByUrl('/profile');
  })
  
  
}
    
}
