import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
@Injectable()
export class AuthenticationService {

  constructor(private httpClient : HttpClient, private cookieService: CookieService) { }

  signIn(Username:String, Password:String){
    const body = {
      Username: Username, Password: Password
    }
    return this.httpClient.post<any>('http://localhost:3001/api/signin', body, {withCredentials: true}).pipe(
      map((res)=>{
        this.cookieService.set("qoubeegy-user", JSON.stringify(res.data));
        console.log(res);
        return res;
      }));

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

  getSession(){
    return this.httpClient.get('http://localhost:3001/api/get-session', {withCredentials: true});
  }
}
