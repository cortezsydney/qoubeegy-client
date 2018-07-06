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
  Datex: String; emptyDatex: Boolean;
  Time: String; emptyTime: Boolean;
  Price: Number; emptyPrice: Boolean;
  Details: String; emptyDetails: Boolean;
  CoverPhoto: String; emptyCoverPhoto: Boolean;
  invalidPrice: Boolean;

  constructor(private authenticationService: ServicesService, private router:Router){ }

  ngOnInit() {
    this.refresh();
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
    this.emptyCoverPhoto = this.emptyDetails = this.invalidPrice = this.emptyPlace = this. emptyDescription = this.emptyDatex = this.emptyPrice = this.emptyTitle = this.emptyTime = false;
  }

  addMovieShowing(){
    this.falsify();
    if(!this.Title) this.emptyTitle = true;
    if(!this.Description) this.emptyDescription = true;
    if(!this.Place) this.emptyPlace = true;
    if(!this.Datex) this.emptyDatex = true;
    if(!this.Time) this.emptyTime = true;
    if(!this.Price) this.emptyPrice = true;
    if(!this.Details) this.emptyDetails = true;
    if(!this.CoverPhoto) this.emptyCoverPhoto= true;
    this.authenticationService.addMovie(this.Title, this.Description, this.Place, this.Datex, this.Time, this.Price, this.Details, this.CoverPhoto)
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

  deleteShowing(selectedId : Number) {
    this.authenticationService.deleteShowingSchedule(selectedId)
    .subscribe((res) => {
      console.log("success delete showing");
      
      this.refresh();
    }, (err) =>{
      console.log("failed delete showing");
      console.log(err.error.message);
      if(err.error.status == 1005 || err.error.status == 1007) this.router.navigateByUrl('/home');
    }); 
  }
}



