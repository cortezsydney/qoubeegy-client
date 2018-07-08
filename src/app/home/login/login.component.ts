import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Username:String;
  Password:String;
  
  usernameEmpty: Boolean;
  passwordEmpty: Boolean;
  credentialInvalid: Boolean;
  
  constructor(private authenticationService:AuthenticationService, private router:Router) {}

  ngOnInit() {}

  falsify(){
    this.usernameEmpty = this.passwordEmpty = this.credentialInvalid = false;
  }
  
  signIn(){
    this.falsify();
    
    if(!this.Username) this.usernameEmpty = true;
    if(!this.Password) this.passwordEmpty = true;

    this.authenticationService.signIn(this.Username, this.Password)
    .subscribe((res)=>{
      this.router.navigateByUrl('/user-qoubeegy');
    }, (err) => {
      switch(err.error.status){
        case 1001: this.usernameEmpty = true; break;
        case 1004: this.passwordEmpty = true; break;
        case 1015: this.credentialInvalid = true; break;
      }
    });
  }
}
