import { Injectable } from '@angular/core';
import {User} from "../_model/user";
import {Flight} from "../_model/Flight";
import {UserBooking} from "../_model/UserBooking";
import {Http,Response,Headers, URLSearchParams} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {

  private loginUrl = environment.loginUrl;
  constructor(private http: Http, private httpClient: HttpClient) { }
  
  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return headers;
  }


  login(emailAddress: string, password: string) : Observable<User>{

    const urlSearchParams = new URLSearchParams();
    console.log("In userService: emailAddress: "+emailAddress);
    console.log("In userService: password: "+password);
    urlSearchParams.append('emailAddress', emailAddress);
    urlSearchParams.append('password', password);

    return this.http.post(`${this.loginUrl}/login`
      , urlSearchParams)
      .map(mapUserFromResponse);

  }


  register(user : User): Observable<User> {

     return this.http.put(`${this.loginUrl}/register`,JSON.stringify(user),{headers: this.getHeaders()}).map(mapUserFromResponse)

  }

  searchFlight(): Observable<Flight[]> {
    return this.http.get(`${this.loginUrl}/findFlights`).map(mapResponseToFlights);
  }
  showBooking(emailAddress: string): Observable<UserBooking[]> {
    const urlSearchParams = new URLSearchParams();
    console.log("In userService: emailAddress: "+emailAddress);
    urlSearchParams.append('emailAddress', emailAddress);
    return this.http.post(`${this.loginUrl}/showBooking`, urlSearchParams).map(mapResponseToUserBookings);
  }

  booking(bookings : UserBooking[]): Observable<UserBooking[]> {

    return this.http.put(`${this.loginUrl}/booking`,JSON.stringify(bookings),{headers: this.getHeaders()}).map(mapUserBookingFromResponse)

 }

 cancelBooking(emailAddress: string, airlines: string) : Observable<UserBooking[]>{

  const urlSearchParams = new URLSearchParams();
  
  urlSearchParams.append('emailAddress', emailAddress);
  urlSearchParams.append('airlines', airlines);

  return this.http.post(`${this.loginUrl}/cancel`
    , urlSearchParams)
    .map(mapResponseToUserBookings);

}


}

function toBooking(r: any): UserBooking[] {
  const bookings = r.status === '1' ? r.bookingList : null;
  return bookings;
}
function mapUserBookingFromResponse(response: Response): UserBooking[] {
  return toBooking(response.json());
}
function mapResponseToUserBookings(response: Response): UserBooking[] {
  return toUserBooking(response.json());
}
function toUserBooking(r: any): UserBooking[] {
  const bookings = r.status === '1' ? r.bookingList : null;
  return bookings;
}
function mapResponseToFlights(response: Response): Flight[] {
  return toFlights(response.json());
}
function toFlights(r: any): Flight[] {
  const flights = r.status === '1' ? r.flightList : null;
  return flights;
}
function mapUserFromResponse(response: Response): User {
  return toUser(response.json());
}
function toUser(r: any): User {
  const respUser = r.status === '1' ? r.user : null;
  const user = r.status === '1'  ? <User> ({
    emailAddress: r.user.emailAddress,
    password: r.user.password
    
  }) : <User> ({
    userError: r.message
  });
  return user;
}
