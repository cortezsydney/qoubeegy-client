import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRequestComponent } from './member/add-request/add-request.component';
import { BookingComponent } from '../user/booking/booking.component';
import { FavoriteComponent } from '../user/favorite/favorite.component';
import { MovieComponent } from '../user/admin/movie/movie.component';
import { AdminBookingComponent } from '../user/admin/admin-booking/admin-booking.component';
import { AllUserComponent } from '../user/admin/all-user/all-user.component';
import { MainFrameComponent } from '../user/main-frame/main-frame.component';
import { RequestComponent } from '../user/admin/request/request.component';

const routes: Routes = [
  {path: 'settings-profile', component: AddRequestComponent},
  {path: 'view-booking', component: BookingComponent},
  {path: 'view-favorite', component: FavoriteComponent},
  {path: 'view-all-showing', component: MovieComponent},
  {path: 'view-all-booking', component: AdminBookingComponent},
  {path: 'view-all-user', component: AllUserComponent},
  {path: 'view-all-request', component: RequestComponent},
  {path: 'user-qoubeegy', component: MainFrameComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
