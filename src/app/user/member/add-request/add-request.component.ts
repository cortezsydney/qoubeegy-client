import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../member/services/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  successRequest: Boolean;
  invalidRequest: Boolean;

  constructor(private authenticationService: ServicesService, private router:Router){}

  ngOnInit(){}

  addRequest(){
    this.authenticationService.addRequest()
    .subscribe((res) => {
      console.log("success add request");
    }, (err) =>{
      console.log(err.error.message)
    }); 
  }
}