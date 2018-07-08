import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../member/services/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  emptyBooking : Boolean;
  arrBooking;
  
  constructor(private authenticationService: ServicesService, private router:Router){}

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.emptyBooking = false;
    
    this.authenticationService.viewBookingByUser()
    .subscribe((res) => {
      this.arrBooking = res.data;
    }, (err) =>{
      if(err.error.status == 201) this.emptyBooking = true;
      console.log(err.error.message)
    }); 
  }

  deleteBooking(selectedBookingId : Number) {
    this.authenticationService.deleteBooking(selectedBookingId)
    .subscribe((res) => {
      console.log("success delete")
      location.reload();
    }, (err) =>{
      console.log(err.error.message);
    }); 
  }
}
