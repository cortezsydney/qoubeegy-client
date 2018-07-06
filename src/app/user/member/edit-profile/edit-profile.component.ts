import { Component, OnInit } from '@angular/core';
import {ServicesService} from './../services/services.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  Username: String;
  UserType: String;
  FirstName: String;
  LastName: String;
  NewPassword: String;
  OldPassword: String;

  phFirstName: String;
  phLastName: String;

  emptyFirstName: Boolean;
  emptyLastName: Boolean;
  emptyNewPassword: Boolean;
  emptyOldPassword: Boolean;

  invalidNewPasswordLength: Boolean;
  invalidNewPasswordType: Boolean;
  invalidOldPassword: Boolean;

  User;
  Prev;

  constructor(private authenticationService: ServicesService, private router:Router) { 
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.User = this.authenticationService.getSession();
    this.Prev = this. User;
  }

  falsfify(){
    this.emptyFirstName = this.emptyLastName = this.emptyNewPassword = this.emptyOldPassword = this.invalidNewPasswordLength = this.invalidNewPasswordType = this.invalidOldPassword = false;
  }

  editProfile(){
    this.falsfify();  

    if(!this.FirstName) this.emptyFirstName = true;
    if(!this.LastName) this.emptyLastName = true;
    if(!this.NewPassword) this.emptyNewPassword = true;
    if(!this.OldPassword) this.emptyOldPassword = true;

    this.authenticationService.editProfile(this.FirstName, this.LastName, this.NewPassword, this.OldPassword)
    .subscribe((res)=>{
      console.log("success edited profile");
     
      this.router.navigateByUrl('/home');
      this.refresh();
    }, (err) =>{
      switch(err.error.status){
        case 1002: this.emptyFirstName = true; break;
        case 1003: this.emptyLastName = true; break;
        case 1006: this.emptyOldPassword = true; break;
        case 1004: this.emptyNewPassword = true; break;
        case 1011: this.invalidNewPasswordLength = true; break;
        case 1012: this.invalidNewPasswordType = true; break;
        case 1016: this.invalidOldPassword = true; break;
      }
      console.log(err.error.message)
    }); 
  }

  deleteProfile(){
    this.authenticationService.deleteProfile()
    .subscribe((res)=>{
        console.log("deleted profile");
        this.router.navigateByUrl('#');
    });
  }
 
}
