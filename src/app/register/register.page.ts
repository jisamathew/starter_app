import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  register() {
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    this.http.post('https://bolviewapibackend.herokuapp.com/users/register',user).subscribe(res=>{
      console.log(user);
    },error=>{
      console.log(error);
    });
  }
}
