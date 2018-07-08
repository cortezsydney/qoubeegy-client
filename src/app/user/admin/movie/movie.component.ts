import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../member/services/services.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  arrShowing;
  emptyShowing: Boolean;
  Title: String; emptyTitle: Boolean;
  Description: String; emptyDescription: Boolean;
  Place: String; emptyPlace: Boolean;
  Datexx: String; emptyDatexx: Boolean;
  Timexx: String; emptyTimexx: Boolean;
  Datex: String; emptyDatex: Boolean;
  Timex: String; emptyTimex: Boolean;
  Price: Number; emptyPrice: Boolean;
  Details: String; emptyDetails: Boolean;
  CoverPhoto: String; emptyCoverPhoto: Boolean;
  invalidPrice: Boolean;
  arrMovies;
  arrHouses;
  chosenTitle : String = "Title"; MovieId : Number;
  emptyChosenTitle: Boolean;
  emptyChosenPlace: Boolean;
  chosenPlace : String = "Movie House"; MovieHouseId: Number;

  constructor(private authenticationService: ServicesService, private router:Router){ }

  ngOnInit() {
    this.refresh();
  }

  changeTitle(Title: String, Id: Number){
    this.chosenTitle = Title;
    this.MovieId = Id;
  }

  changeHouse(House: String, Id: Number){
    this.chosenPlace = House;
    this.MovieHouseId = Id;
  }

  refresh(){
    this.emptyShowing = false;

    this.authenticationService.viewAllShowingSchedules()
    .subscribe((res) => {
      console.log("success view showing");
      this.arrShowing = res.data;
    }, (err) =>{
      console.log(err.error.message)
      if(err.error.status == 201) this.emptyShowing = true;
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }

  falsify(){
    this.emptyDatexx = this.emptyTimexx = this.emptyDatex = this.emptyTimex = this.emptyChosenPlace =  this.emptyChosenTitle = this.emptyCoverPhoto = this.emptyDetails = this.invalidPrice = this.emptyPlace = this. emptyDescription = this.emptyPrice = this.emptyTitle = false;
  }

  addMovie(){
    this.falsify();
    if(!this.Title) this.emptyTitle = true;
    if(!this.Description) this.emptyDescription = true;
    if(!this.Place) this.emptyPlace = true;
    if(!this.Datexx) this.emptyDatexx = true;
    if(!this.Timexx) this.emptyTimexx = true;
    if(!this.Price) this.emptyPrice = true;
    if(!this.Details) this.emptyDetails = true;
    if(!this.CoverPhoto) this.emptyCoverPhoto= true;

    this.authenticationService.addMovie(this.Title, this.Description, this.Place, this.Datexx, this.Timexx, this.Price, this.Details, this.CoverPhoto)
    .subscribe((res) => {
      console.log("success add movie showing");
      location.reload();
    }, (err) =>{
      console.log(err.error)
      switch(err.error.status){
        case 1017: this.invalidPrice = true; break;
      }
    }); 
  }

  addShowing(){
    if(!this.MovieId) this.emptyChosenTitle = true;
    if(!this.MovieHouseId) this.emptyChosenPlace = true;
    if(!this.Datex) this.emptyDatex = true;
    if(!this.Timex) this.emptyTimex = true;
    this.authenticationService.addShowing(this.MovieId, this.MovieHouseId, this.Datex, this.Timex)
    .subscribe((res) => {
      console.log("success addded showing");
      location.reload();
    }, (err) =>{
      console.log(err.error)
      switch(err.error.status){
        case 1017: this.invalidPrice = true; break;
      }
    }); 
  }

  viewMovieTitle(){
    this.authenticationService.viewMovies()
    .subscribe((res) => {
      this.arrMovies = res.data;
      console.log(this.arrMovies)
    }, (err) =>{
      console.log(err.error.message);
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }

  viewMovieHouse(){
    this.authenticationService.viewAllHouses()
    .subscribe((res) => {
      this.arrHouses = res.data;
      console.log(this.arrHouses)
    }, (err) =>{
      console.log(err.error.message);
    }); 
  }

  deleteShowing(selectedId : Number) {
    this.authenticationService.deleteShowingSchedule(selectedId)
    .subscribe((res) => {
      console.log("success delete showing");
      this.refresh();
    }, (err) =>{
      console.log(err.error.message);
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }
}



