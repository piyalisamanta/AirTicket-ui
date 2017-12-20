import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {LandingComponent} from '../landing/landing.component';
import {ErrorComponent} from '../error/error.component';

const routes : Routes =[
  {path : "login", component : LoginComponent},
  {path : "register", component : RegisterComponent},
  {path : "landing", component : LandingComponent},
  {path : "error", component : ErrorComponent},
  {path : "", redirectTo: "login", pathMatch : "full"},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
