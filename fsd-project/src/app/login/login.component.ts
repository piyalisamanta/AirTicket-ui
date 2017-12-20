import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user : any={};
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
   
  }


  login(){
    console.log("In loginComponent"+ this.user.emailAddress);
    this.userService.login(this.user.emailAddress,this.user.password)
    .subscribe(r => {
      const user=r;
      if(user && user.emailAddress){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/landing']);
      }else{
        this.router.navigate(['/error']);
      }
    })

  }

}
