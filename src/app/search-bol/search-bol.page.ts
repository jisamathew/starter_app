import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
var App;
@Component({
  selector: 'app-search-bol',
  templateUrl: './search-bol.page.html',
  styleUrls: ['./search-bol.page.scss'],
})
export class SearchBolPage implements OnInit {
  postList: any;

  constructor(private http: HttpClient) {
    App = this;

  }
  ngOnInit() {
  }


  getBOLData(){
    console.log('getBOLData');

    // getInputElement() => Promise<HTMLInputElement>document.getElementById('searchEle')
    console.log('id',(<HTMLIonSearchbarElement>document.getElementById('searchEle')).value);
     var CompanyName = (<HTMLIonSearchbarElement>document.getElementById('searchEle')).value;

    var dataResponse = new Array();

    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.gleif.org/api/v1/lei-records?filter[entity.legalName]=' + CompanyName + '&page[number]=1&page[size]=10', true);
    request.onload = function () {
      console.log('this.response');

      console.log(this.response);
        // // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            // data.data.forEach(items => {
            //   dataResponse.push(items);
            //   console.log('App.leidata');
            // });

            // console.log('dataResponse');
            // console.log(dataResponse);
            // App.postList =dataResponse;
            App.postList =data.data[0];

            // document.getElementById('bol').style.display="block";

            console.log('App.leidata');
            console.log(App.postList);
        } else {
            alert('Sorry!! LEI Details Not Found...');

        }
    }
    request.send();

  }

  private prepareDataRequest() {
    console.log('getBOLData');
    var CompanyName = (<HTMLIonSearchbarElement>document.getElementById('searchEle')).value;
    // Define the data URL

    const dataUrl = 'https://api.gleif.org/api/v1/lei-records?filter[entity.legalName]=' + CompanyName + '&page[number]=1&page[size]=50';
    // Prepare the requestWorks
    // return this.http.get(dataUrl);
    this.http.get(dataUrl).subscribe((data)=>{
      console.log(data)
      this.postList = data;
  });

  }
}
