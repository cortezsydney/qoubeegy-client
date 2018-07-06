import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../member/services/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  arrRequest;

  constructor(private authenticationService: ServicesService, private router:Router){ }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.authenticationService.viewRequests()
    .subscribe((result) => {
      this.arrRequest = result.data;
      console.log(this.arrRequest);
    }); 
  }

  acceptRequest(selectedUserId: Number) {
    this.authenticationService.approveRequest(selectedUserId)
    .subscribe((res) => {
      console.log("success approve")
      location.reload();
    }, (err) =>{
      console.log(err.error.message);
    }); 
  }

  rejectRequest(selectedUserId: Number) {
    this.authenticationService.rejectRequest(selectedUserId)
    .subscribe((res) => {
      console.log("success reject")
      location.reload();
    }, (err) =>{
      console.log(err.error.message);
    }); 
  }

}
