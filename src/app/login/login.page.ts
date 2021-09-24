import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit() {
  }
   //function to dismiss signup modal
   dismissModal() {
    this.modalCtrl.dismiss();
  }
  login(){
    console.log('login works');
    let credentials = {
        email: this.email,
        password: this.password
    };
    console.log(credentials);
    // this.http.post('http://localhost:3000/users/login',credentials).subscribe(res=>{
    this.http.post('https://bolviewapibackend.herokuapp.com/users/login',credentials).subscribe(res=>{
      console.log(res);
      localStorage.setItem('User',JSON.stringify(res));
      this.router.navigateByUrl('',{replaceUrl:true});
    },error=>{
      console.log(error);
    });
  }

}
