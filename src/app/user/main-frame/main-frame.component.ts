import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../member/services/services.service';
import {Router} from '@angular/router';
import { WebsocketService } from '../member/services/websocket.service';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})
export class MainFrameComponent implements OnInit {
  movies;
  favorites;
  Title: String;
  Place: String;
  SeatLetter: String;
  SeatNumber: String;
  titleSearch;
  titleEmpty: Boolean;
  placeEmpty: Boolean;
  searchEmpty: Boolean;
  seatEmpty: Boolean;
  invalidSeat: Boolean;
  takenSeats=[];
  selectedMovieShowingId;
  selectedSeat: String;
  clientSeat: String;

  constructor(private authenticationService: ServicesService, private router:Router, private socketService: WebsocketService) {
  }

  ngOnInit() {
    this.refresh();
    this.socketService.onEvent("add-booking").subscribe(result => {
      this.clientSeat = result.Seat;
    });
  }

  refresh(){
    this.authenticationService.viewMovies()
    .subscribe((res)=>{
      this.movies = res.data;

      this.authenticationService.viewFavoriteByUser()
        .subscribe((result)=>{
          this.favorites = result.data;
        });
    });
  }

  viewSeats(MovieShowingId: Number) {
    this.selectedMovieShowingId = MovieShowingId;
    this.authenticationService.viewSeats(MovieShowingId).subscribe(result => {
      this.takenSeats = result.data.map(seat => seat.Seat);
    }, err => {
      console.log(err.error);
    });
  }

  setFile(Path: String){
    return `../../../assets/${Path}`
  }

  clearMovies(movieObject){
    Object.keys(movieObject).forEach(key=>{
      delete movieObject[key];
    })
  }

  viewBy(){
    if(!this.Title)  this.titleEmpty = true;
    else this.titleEmpty = false;
    if(!this.Place) this.placeEmpty = true;
    else this.placeEmpty = false;

    if(!this.Title && !this.Place){
      this.authenticationService.viewMovies()
      .subscribe((res)=>{
        this.movies = res.data;
        this.searchEmpty = false;
      },(err) => {
        this.searchEmpty = true;
      });
    }else if(this.Title && this.Place){
      this.authenticationService.viewShowingByPlaceTitle(this.Place, this.Title)
      .subscribe((res)=>{
        this.movies = res.data;
        this.searchEmpty = false;

      },(err) => {
        this.clearMovies(this.movies);
        this.searchEmpty = true;
      });
    }else if(this.Title){
      this.authenticationService.viewShowingByTitle(this.Title)
      .subscribe((res)=>{
        this.movies = res.data;
        this.searchEmpty = false;
      }, (err) => {
        this.clearMovies(this.movies);
        this.searchEmpty = true;
      });
    }else if(this.Place){
      this.authenticationService.viewShowingByPlace(this.Place)
      .subscribe((res)=>{
        this.movies = res.data;
        this.searchEmpty = false;
      }, (err) => {
        this.clearMovies(this.movies);
        this.searchEmpty = true;
      });
    }
  }

  addFavorite(selectedMovieId: Number){
    this.authenticationService.addFavorite(selectedMovieId)
    .subscribe((res)=>{
      console.log("success add favorite")
      location.reload();
    }, (err) => {
      console.log(err.error.message)
      if(err.error.status === 1005) this.router.navigateByUrl('/home')
    });
  }

  selectSeat(Seat: String) {
    this.selectedSeat = Seat;
    this.socketService.addBooking({MovieShowingId: this.selectedMovieShowingId, Seat: this.selectedSeat});
  }

  checkSelectedSeat(Seat) {
    if(this.selectedSeat === Seat) {
      return true;
    }
    if (this.clientSeat === Seat) {
      return true;
    }
  }

  addBooking(){
    this.seatEmpty = false;
    this.invalidSeat = false;

    if(!this.selectedSeat) return this.seatEmpty = true;

    this.authenticationService.addBooking(this.selectedMovieShowingId, this.selectedSeat)
    .subscribe((res)=>{
      console.log("success add booking");
      location.reload();
    }, (err) => {
      console.log(err.error.message)
      switch(err.error.status){
        case 1005: this.router.navigateByUrl('/home'); break;
        case 1008: this.seatEmpty = true; break;
        case 1026: this.invalidSeat = true; break;
      }
    });
  }

  checkIfTaken(seat: string) {
    return this.takenSeats.includes(seat);
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
}
