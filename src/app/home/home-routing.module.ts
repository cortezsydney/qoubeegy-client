import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'; 
import { NowShowingPageComponent } from './now-showing-page/now-showing-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'view-movies', component: NowShowingPageComponent},
  {path: 'sign-up', component: SignupPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
