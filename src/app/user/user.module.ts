import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { NavigationComponent } from './member/navigation/navigation.component';
import { EditProfileComponent } from './member/edit-profile/edit-profile.component';
import {ServicesService} from '../user/member/services/services.service';


import { CookieService } from 'ngx-cookie-service';
import { AddRequestComponent } from './member/add-request/add-request.component';
import { BookingComponent } from './booking/booking.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MovieComponent } from './admin/movie/movie.component';
import { AdminBookingComponent } from './admin/admin-booking/admin-booking.component';
import { AllUserComponent } from './admin/all-user/all-user.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { RequestComponent } from './admin/request/request.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    HttpClientModule
  ],
  declarations: [NavigationComponent, EditProfileComponent, AddRequestComponent, BookingComponent, FavoriteComponent, MovieComponent, AdminBookingComponent, AllUserComponent, MainFrameComponent, RequestComponent],
  providers : [ServicesService, CookieService]
})
export class UserModule { }
