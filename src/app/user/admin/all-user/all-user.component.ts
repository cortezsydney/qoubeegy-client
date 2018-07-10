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
  numBooking;
  numFavorite;

  constructor(private authenticationService: ServicesService, private router:Router){ }

  ngOnInit() {
    this.refresh();
  }

  clearArr(arr){
    // Object.keys(arr).forEach(key=>{
    //   delete arr[key];
    // })
    return arr = [];
  }

  bookingByUser(selectedUserId: Number, i: number){
    this.authenticationService.viewEachBookings(selectedUserId)
    .subscribe((res) => {
      this.arrUser[i].booking= res.data.length;
    }, (err) =>{
      console.log(err.error.message);
      if(err.error.status == 201) this.arrUser[i].booking= 0;
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }

  viewBookings(selectedUserId: Number, i: number){
    this.authenticationService.viewEachBookings(selectedUserId)
    .subscribe((res) => {
      this.numBooking = res.data;
      console.log(this.numBooking)
    }, (err) =>{
      console.log(err.error.message);
      this.numBooking = [];
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
    
  }

  viewFavorites(selectedUserId: Number, i: number){
    console.log("huh")
    this.authenticationService.viewEachFavorites(selectedUserId)
    .subscribe((res) => {
      this.numFavorite = res.data;
      console.log(this.numFavorite)
    }, (err) =>{
      console.log(err.error.message);
      this.numFavorite = [];
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
    
  }

  favoriteByUser(selectedUserId: Number, i: number){
    this.authenticationService.viewEachFavorites(selectedUserId)
    .subscribe((res) => {
      this.arrUser[i].favorite= res.data.length
    }, (err) =>{
      console.log(err.error.message);
      if(err.error.status == 201) this.arrUser[i].favorite= 0;
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }

  refresh(){
    this.authenticationService.viewAllUsers()
    .subscribe((res) => {
      console.log("success view users");
      this.arrUser = res.data;

      for (var i = 0; i < res.data.length; i++){
        this.bookingByUser(res.data[i].UserId, i);
        this.favoriteByUser(res.data[i].UserId, i);
      }
    }, (err) =>{
      console.log(err.error.message)
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }

  deleteUser(selectedUserId: Number){
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
