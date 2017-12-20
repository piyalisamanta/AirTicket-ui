import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from '@angular/router';
import { Flight } from '../_model/Flight';
import { UserBooking } from '../_model/UserBooking';
import { User } from '../_model/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  flights: Flight[];
  bookings: UserBooking[];
  flight: any={};
  userBooking: UserBooking;
  emailAddress : string;
  currenUser: any={}
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
   const currenUser= JSON.parse(localStorage.getItem("currentUser"));
    console.log("here 1:"+currenUser.emailAddress);
    this.showBooking(currenUser.emailAddress);

  }


  showBooking(emailAddress: string) {
    this.userService.showBooking(emailAddress).subscribe(r => {
      this.bookings = r;
    });
  }

  searchFlights() {
    console.log("In search FLights");
    this.userService.searchFlight().subscribe(r=>{
      this.flights = r;
    });
  }

  booking(){
    const flights: Flight[] = this.flights;
    const currenUser= JSON.parse(localStorage.getItem("currentUser"));
    for(let index = 0; index < flights.length; index++){
      const flight = flights[index];
      if(flight.toBeBooked){
        const userBooking: UserBooking = {airlines: flight.airlines, departDate: flight.deptDate, 
          departTime: flight.deptTime, arrivalTime: flight.arrivalTime, totalCost: flight.cost, emailAddress: currenUser.emailAddress};
        /*userBooking.airlines=flight.airlines;
        userBooking.departDate=flight.deptDate;
        this.userBooking.departTime=flight.deptTime;
        this.userBooking.arrivalTime=flight.arrivalTime;
        this.userBooking.passCount=currenUser.passCount;
        this.userBooking.totalCost=flight.cost;
        this.userBooking.emailAddress=currenUser.emailAddress;*/
        this.bookings.push(userBooking);
        this.userService.booking(this.bookings).subscribe(r => {
      this.bookings = r;
    })
      }
    }
    /*

    airlines: string,
	departDate: string,
	departTime: string,
	arrivalTime: string,
	passCount: number,
	totalCost: number,
	emailAddress: string,
	toBeCancelled?: boolean,
    */


    
  }

  cancel(){
    const bookings: UserBooking[] = this.bookings;

   /* bookings.forEach(function(booking: UserBooking) {
      if(booking.toBeCancelled){
        this.userService.cancelBooking(booking.emailAddress, booking.airlines)
      .subscribe(r => {
        this.bookings = r;
      })
      }
    });*/
    for(let index = 0; index < bookings.length; index++){
      const booking = bookings[index];
      if(booking.toBeCancelled){
        this.userService.cancelBooking(booking.emailAddress, booking.airlines)
      .subscribe(r => {
        this.bookings = r;
      })
      }
    }
    
  }


}
