import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { NowShowingPageComponent } from './now-showing-page/now-showing-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { CookieService } from 'ngx-cookie-service';
import { GuestNavigationComponent } from './guest-navigation/guest-navigation.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ],
  declarations: [ HomePageComponent, LoginComponent, NowShowingPageComponent, SignupPageComponent, GuestNavigationComponent],
  providers : [AuthenticationService, CookieService]
})
export class HomeModule { }
