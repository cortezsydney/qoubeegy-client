import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../member/services/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent implements OnInit {
  arrBooking;
  emptyBooking: Boolean;

  constructor(private authenticationService: ServicesService, private router:Router){ }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.emptyBooking = false;
    this.authenticationService.viewMovieBookings()
    .subscribe((res) => {
      console.log("success view request");
      this.arrBooking = res.data;
    }, (err) =>{
      console.log(err.error.message)
      if(err.error.status == 201) this.emptyBooking = true;
    });
  }

  deleteBooking(selectedBookingId : Number) {
    this.authenticationService.deleteBookingByAdmin(selectedBookingId)
    .subscribe((res) => {
      console.log("success delete")
      location.reload();
    }, (err) =>{
      console.log(err.error.message);
    }); 
  }
}