import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-now-showing-page',
  templateUrl: './now-showing-page.component.html',
  styleUrls: ['./now-showing-page.component.css']
})
export class NowShowingPageComponent implements OnInit {
  movies;
  Title: String;
  Place: String;
  titleEmpty: Boolean;
  placeEmpty: Boolean;
  searchEmpty: Boolean;


  constructor(private authenticationService:AuthenticationService, private router:Router) {}

  ngOnInit() {
    this.authenticationService.viewMovies()
    .subscribe((res)=>{
      this.movies = res.data;
    });
  }

  clearMovies(movieObject){
    Object.keys(movieObject).forEach(key=>{
      delete movieObject[key];
    })
  }

  setFile(Path: String){
    return `../../../assets/${Path}`
  }

  falsify(){
    this.titleEmpty = this. placeEmpty = this.searchEmpty = false;
  }

  viewBy(){
    this.falsify()

    if(!this.Title)  this.titleEmpty = true;
    if(!this.Place) this.placeEmpty = true;

    if(!this.Title && !this.Place){
      this.authenticationService.viewMovies()
      .subscribe((res)=>{
        this.movies = res.data;
      },(err) => {
        this.searchEmpty = true;
      });
    }else if(this.Title && this.Place){
     this.authenticationService.viewShowingByPlaceTitle(this.Place, this.Title)
     .subscribe((res)=>{
        this.movies = res.data;
      },(err) => {
        this.clearMovies(this.movies);
        this.searchEmpty = true;
      });
    }else if(this.Title){
      this.authenticationService.viewShowingByTitle(this.Title)
      .subscribe((res)=>{
        this.movies = res.data;
      }, (err) => {
        this.clearMovies(this.movies);
        this.searchEmpty = true;
      });
    }else if(this.Place){
      this.authenticationService.viewShowingByPlace(this.Place)
      .subscribe((res)=>{
        this.movies = res.data;
      }, (err) => {
        this.clearMovies(this.movies);
        this.searchEmpty = true;
      });
    }
  }
}
