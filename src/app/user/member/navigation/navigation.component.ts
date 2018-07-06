import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServicesService} from './../services/services.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  phUser: String;
  admin: Boolean;
  notif: Number;
  User;
  
  constructor(private authenticationService: ServicesService, private router:Router) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.User = this.authenticationService.getSession();
    this.phUser = this.User.FirstName;
    if(this.User.UserType === "ADMIN") this.admin = true;
    this.authenticationService.viewRequests()
    .subscribe((result) => {
      this.notif = result.data.length;
      console.log(this.notif)
    }); 
  }

  signOut(){
    this.authenticationService.signOut()
    .subscribe((res) => {
      console.log("success sign out")
      this.router.navigateByUrl('/home');
    }, (err) =>{
      console.log("fail sign out")
    });
  }
}
