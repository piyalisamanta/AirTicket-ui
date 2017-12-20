import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { UserService } from './services/user.service';
import {HttpModule} from '@angular/http';
import { MatchValidatorDirective } from './match-validator.directive';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    MatchValidatorDirective,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
