import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../member/services/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  arrUser;
  arrRequest;

  constructor(private authenticationService: ServicesService, private router:Router){ }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.authenticationService.viewAllUsers()
    .subscribe((res) => {
      console.log("success view users");
      this.arrUser = res.data;

      this.authenticationService.viewRequests()
      .subscribe((result) => {
        this.arrRequest = result.data;
      });
    }, (err) =>{
      console.log(err.error.message)
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }

  deleteUser(selectedUserId: Number){
    console.log(selectedUserId + "choosen")
    this.authenticationService.deleteUser(selectedUserId)
    .subscribe((res) => {
      console.log("success delete user");
      this.refresh();
    }, (err) =>{
      console.log(err.error.message);
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }
}
