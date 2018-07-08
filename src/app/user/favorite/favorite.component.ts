import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../member/services/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  arrFavorite;
  titleSearch;
  Title: String;
  Place: String;
  SeatLetter: String;
  SeatNumber: String;
  titleEmpty: Boolean;
  placeEmpty: Boolean;
  searchEmpty: Boolean;
  seatEmpty: Boolean;
  invalidSeat: Boolean;
  
  constructor(private authenticationService: ServicesService, private router:Router){ }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.authenticationService.viewFavoriteByUser()
    .subscribe((res) => {
      console.log("success view favorite");
      this.arrFavorite = res.data;
    }, (err) =>{
      console.log(err.error.message)
      if(err.error.status == 1005) this.router.navigateByUrl('/home');
    }); 
  }

  setFile(Path: String){
    return `../../../assets/${Path}`
  }
  
  deleteFavorite(selectedFavoriteId: Number){
    this.authenticationService.deleteFavorite(selectedFavoriteId)
    .subscribe((res) => {
      console.log("success delete favorite");
      location.reload();
    }, (err) =>{
      if(err.error.status == 1005) this.router.navigateByUrl('/home');
      console.log(err.error)
      console.log("failed delete favorite")
    }); 
  }

  addBooking(selectedShowingId: Number, Seat: String){
    this.seatEmpty = false;
    this.invalidSeat = false;

    if(!this.SeatLetter || !this.SeatNumber) return this.seatEmpty = true;

    this.authenticationService.addBooking(selectedShowingId, Seat)
    .subscribe((res)=>{
      console.log("success add booking");
      location.reload();
    }, (err) => {
      console.log(err.error.message)
      console.log("fail");
      switch(err.error.status){
        case 1005: this.router.navigateByUrl('/home'); break;
        case 1008: this.seatEmpty = true; break;
        case 1026: this.invalidSeat = true; break;
      } 
    });
  }

  searchMovie(selectedMovieTitle: String){
    this.authenticationService.viewShowingByTitle(selectedMovieTitle)
      .subscribe((res)=>{
        this.titleSearch = res.data;
      }, (err) => {
        console.log(err.error.message)
        if(err.error.status === 1005) this.router.navigateByUrl('/home')
      });
  }
}
