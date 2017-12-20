import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user : any ={}

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  
  register(){
    console.log("In loginComponent"+ this.user.emailAddress);
    this.userService.register(this.user)
    .subscribe(r => {
      const user=r;
      if(user && user.emailAddress){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/landing']);
      }else{

        
      
      }
    })
  }

}
