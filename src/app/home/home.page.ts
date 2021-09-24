import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
//for login
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slidesOptions = {
    slidesPerView: 1.5
  };
  userDetails: any;
  constructor( private router: Router,private ngZone: NgZone,public modalController: ModalController) {
    const user = localStorage.getItem('User');
    if(user == null){
      this.router.navigateByUrl('login',{replaceUrl:true});
    }
    console.log(JSON.parse(user));
    this.userDetails = JSON.parse(user);
  }

  redirecttoBOLPage(){
    this.ngZone.run(()=>this.navigateTo('search'));
  }
  redirecttoBOLLog(){
    this.ngZone.run(()=>this.navigateTo('bollog'));
  }
  navigateTo(url){
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([url]);
  }
  //opens login modal
  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


}
