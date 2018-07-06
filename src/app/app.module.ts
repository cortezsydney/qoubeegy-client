import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {UserModule} from './user/user.module';
import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module';
import { AppRoutingModule }     from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    
    BrowserModule,
    HomeModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
