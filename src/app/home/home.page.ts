import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
var App;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private router: Router,private ngZone: NgZone) { }

  slidesOptions = {
    slidesPerView: 1.5
  }


  redirecttoBOLPage(){
    this.ngZone.run(()=>this.navigateTo('search'));
  }
  navigateTo(url){
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([url]);
  }



}
