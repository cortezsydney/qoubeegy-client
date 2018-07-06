import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  Username:String;
  FirstName: String;
  LastName: String;
  Password:String;
  cPassword: String;
  usernameEmpty: Boolean;
  firstNameEmpty: Boolean;
  lastNameEmpty: Boolean;
  passwordEmpty: Boolean;

  notMatch: Boolean;
  existingEmail: Boolean;
  invalidEmail: Boolean;
  invalidPasswordLength: Boolean;
  invalidPasswordType: Boolean;

  internalError: Boolean;
  
  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  falsify(){
    this.usernameEmpty = false;
    this.firstNameEmpty = false;
    this.lastNameEmpty = false;
    this.passwordEmpty = false;
    this.existingEmail = false;
    this.invalidEmail = false;
    this.invalidPasswordLength = false;
    this.invalidPasswordType = false;
    this.internalError = false;
    this.notMatch = false;
  }

  signUp(){
    this.falsify();

    if(!this.Username) this.usernameEmpty = true; 
    if(!this.FirstName) this.firstNameEmpty = true;
    if(!this.LastName) this.lastNameEmpty = true; 
    if(!this.Password) this.passwordEmpty = true; 
    else{
      if(this.Password.length < 4 || this.Password.length > 16) this.invalidPasswordLength = true;
    }
    if (this.Password !== this.cPassword) return this.notMatch = true;
    

    this.authenticationService.addMember(this.Username, this.FirstName, this.LastName, this.Password)
    .subscribe((res)=>{
      console.log("success sign up")
      this.router.navigateByUrl('home')
      location.reload();
    }, (err) => {
      console.log(err.error.message)
      switch(err.error.status){
        case 1013: this.invalidEmail = true; break;
        case 1011: this.invalidPasswordLength = true; break;
        case 1012: this.invalidPasswordType = true; break;
        case 1021: this.existingEmail = true; break;
        case 500: this.internalError = true; break;
      }
    });
  }
}
