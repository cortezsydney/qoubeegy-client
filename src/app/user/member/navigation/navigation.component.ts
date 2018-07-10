import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServicesService} from './../services/services.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  admin: Boolean;
  notif: Number;
  User;
  
  constructor(private authenticationService: ServicesService, private router:Router, private cookieservice: CookieService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.User = this.authenticationService.getSession();
    console.log(this.User)
    if(this.User.UserType === "ADMIN") this.admin = true;

    this.authenticationService.viewRequests()
    .subscribe((result) => {
      this.notif = result.data.length;
    }); 
  }

  signOut(){
    this.authenticationService.signOut()
    .subscribe((res) => {
      this.cookieservice.deleteAll();
      console.log("success sign out")
      this.router.navigateByUrl('/home');
    }, (err) =>{
      console.log("fail sign out")
    });
  }
}