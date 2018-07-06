import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
@Injectable()
export class ServicesService {

  constructor(private httpClient : HttpClient, private cookieservice:CookieService) { }

  getSession(){
    return JSON.parse(this.cookieservice.get("qoubeegy-user"));
  }

  editProfile(FirstName: String, LastName: String, NewPassword:String, OldPassword: String){
    console.log(this.cookieservice.get("qoubeegy-user"))
    const User = JSON.parse(this.cookieservice.get("qoubeegy-user"));

    const body = {
      UserId: User.UserId, FirstName: FirstName, LastName: LastName, NewPassword: NewPassword, OldPassword: OldPassword
    }
    return this.httpClient.put<any>('http://localhost:3001/api/profile/edit', body, {withCredentials: true}).pipe(
      map((res)=>{
        this.cookieservice.set("qoubeegy-user", JSON.stringify(res.data));
        console.log(res);
        return res;
      }));
  }

  deleteProfile(){
    return this.httpClient.delete<any>('http://localhost:3001/api/profile/delete', {withCredentials: true});
  }

  addRequest(){
   return this.httpClient.post<any>('http://localhost:3001/api/profile/apply', {}, {withCredentials: true});
  }


  signOut(){
    this.cookieservice.deleteAll();
    return this.httpClient.post<any>('http://localhost:3001/api/signout', {withCredentials: true});
  }
  
  deleteBooking(MovieBookingId: Number){
    console.log(MovieBookingId)
    return this.httpClient.delete<any>(`http://localhost:3001/api/booking/delete/${MovieBookingId}`,  {withCredentials: true});
  }

  deleteFavorite(FavoriteId: Number){
    console.log(FavoriteId + "checl")
    return this.httpClient.delete<any>(`http://localhost:3001/api/favorite/delete/${FavoriteId}`, {withCredentials: true});
  }

  getMovies(){
    return this.httpClient.get<any>('http://localhost:3001/api/all/movies');
  }

  

  rejectRequest(UserId: Number){
    return this.httpClient.delete<any>(`http://localhost:3001/api/profile/apply/reject/${UserId}`, {withCredentials: true});
  }

  approveRequest(UserId: Number){
    return this.httpClient.delete<any>(`http://localhost:3001/api/profile/apply/approve/${UserId}`, {withCredentials: true});
  }

  deleteMovie(MovieId: Number){
    return this.httpClient.put<any>('http://localhost:3001/api/movie/delete', MovieId, {withCredentials: true});
  }
  deleteUser(UserId: Number){
    return this.httpClient.delete<any>(`http://localhost:3001/api/all/users/delete/${UserId}`, {withCredentials: true});
  }


  addMovie(Title: String, Description: String, Place: String, Date: String, Time: String, Price: Number, Details: String, Photo: String){
    const body = {
      Title: Title, Description: Description, Place: Place, Price: Price, Time: Time, Date: Date, Details: Details, Photo: Photo
    }
    return this.httpClient.post<any>('http://localhost:3001/api/movie/add', body, {withCredentials: true});
  }

  deleteShowingSchedule(MovieShowingId: Number){
    console.log(MovieShowingId)
    return this.httpClient.delete<any>(`http://localhost:3001/api/all/movies/schedules/${MovieShowingId}`, {withCredentials: true});
  }


  viewAllShowingSchedules(){
    return this.httpClient.get<any>(`http://localhost:3001/api/all/movies/schedules`, {withCredentials: true});
  }

  viewFavoriteByUser(){
    return this.httpClient.get<any>(`http://localhost:3001/api/view/favorite`, {withCredentials: true});
  }

  viewRequests(){
    return this.httpClient.get<any>('http://localhost:3001/api/all/request', {withCredentials: true});
  }
//put search request
  viewUsers(){
    return this.httpClient.get<any>('http://localhost:3001/api/all/users');
  }
//put search in User

  viewMovieBookings(){
    return this.httpClient.get<any>('http://localhost:3001/api/all/movies/bookings', {withCredentials: true});
  }

  viewBookingByUser(){
    return this.httpClient.get<any>('http://localhost:3001/api/booking/all', {withCredentials: true});
  }

  viewAllUsers(){
    return this.httpClient.get<any>('http://localhost:3001/api/all/users', {withCredentials: true});
  }


  viewShowingByTitle(Title: String){
    return this.httpClient.get<any>(`http://localhost:3001/api/movies/showings/title/${Title}`);
  }

  viewShowingByPlace(Place: String){
    return this.httpClient.get<any>(`http://localhost:3001/api/movies/showings/place/${Place}`);
  }

  viewShowingByPlaceTitle(Place: String, Title: String){
    const body = {
      Place: Place, Title: Title
    }
    return this.httpClient.post<any>(`http://localhost:3001/api/movies/showings/place/title`, body);
  }

  addMember(Username:String, FirstName: String, LastName: String, Password: String){
    const body = {
      Username: Username, FirstName: FirstName, LastName: LastName, Password: Password
    }
    return this.httpClient.post<any>('http://localhost:3001/api/Member/add', body);
  }

  viewMovies(){
    return this.httpClient.get<any>('http://localhost:3001/api/all/movies');
  }


  addFavorite(MovieId: Number){
    const body = {
      MovieId: MovieId
    }
    return this.httpClient.post<any>(`http://localhost:3001/api/favorite/add`, body, {withCredentials: true});
  }

  addBooking(MovieShowingId: Number, Seat: String){
    const body ={ MovieShowingId: MovieShowingId, Seat: Seat}
    return this.httpClient.post<any>(`http://localhost:3001/api/booking/add`, body, {withCredentials: true});
  }
}