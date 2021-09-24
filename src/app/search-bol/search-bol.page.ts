import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {IpfsService} from '../service/ipfs.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

var App;
declare const Buffer;

@Component({
  selector: 'app-search-bol',
  templateUrl: './search-bol.page.html',
  styleUrls: ['./search-bol.page.scss'],
})
export class SearchBolPage implements OnInit {
  postList: any;
  userDetails: any;
  bolStatus: boolean;
  ipfsConversion: any;
  constructor(private http: HttpClient,public ipfs: IpfsService,private router: Router,public alertController: AlertController) {
    App = this;
  this.bolStatus=false;
    const user = localStorage.getItem('User');
    if(user == null){
      this.router.navigateByUrl('login',{replaceUrl:true});
    }
    console.log(JSON.parse(user));
    this.userDetails = JSON.parse(user);

  }
  ngOnInit() {
  }


  getBOLData(){
    console.log('getBOLData');
    console.log('1.Date');
    var datePack = new Date();
    var dt = datePack.toDateString();
    console.log(dt);
    console.log("2.Time");
    var getTimeNow = datePack.getTime();
    var TimeValue = getTimeNow;
    console.log(TimeValue);

    console.log('id',(<HTMLIonSearchbarElement>document.getElementById('searchEle')).value);
    var BOLNO = (<HTMLIonSearchbarElement>document.getElementById('searchEle')).value;

    var dataResponse = new Array();

    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.gleif.org/api/v1/lei-records?filter[entity.legalName]=' + BOLNO + '&page[number]=1&page[size]=10', true);
    request.onload = function () {
      console.log('BOLData');
      console.log(this.response);
      // // Begin accessing BOL JSON data here
      var data = JSON.parse(this.response);
      console.log(data.data[0].id);

      //hashing log data
      console.log('UserDetails');
      console.log(App.userDetails);
      var ipfsfiles = {
        BOLNo: 'BOL'+data.data[0].id,
        UserID: App.userDetails._id,
        firstName: App.userDetails.firstName,
        lastName: App.userDetails.lastName,
        email: App.userDetails.email,
        Date: dt, //to
        Time: TimeValue,
        Status:'BOL Viewed'
      };
      console.log('ipfsfiles');
      console.log(ipfsfiles);
      App.ipfs.saveToIpfs(ipfsfiles).then((ipfsdata)=>{
        console.log('save ipfs data');
        console.log(ipfsdata);
        const bolNO='BOL'+data.data[0].id;
        //save bol and ipfsHash in mongo
        let logValue = {
          BOLNO:bolNO,
          LogsHash: ipfsdata,
        };
        App.http.post('https://bolviewapibackend.herokuapp.com/users/logsave',logValue).subscribe(res=>{
          console.log(logValue);
         //BOL
         if (request.status >= 200 && request.status < 400) {
          App.checkStatus(bolNO);
          App.postList =data.data[0];

          // document.getElementById('bol').style.display="block";

          console.log('App.leidata');
          console.log(App.postList);
      } else {
          alert('Sorry!! LEI Details Not Found...');

      }

        },error=>{
          console.log(error);
        });

      });
    }
    request.send();

  }
  checkStatus(bolNum){
    console.log(bolNum);
    this.http.get('https://bolviewapibackend.herokuapp.com/users/BOLlog/'+bolNum).subscribe((res: any[])=>{
      console.log('Getting log of BOl searched') ;
      console.log(res);

      for (let i = 0; i < res.length; i++) {
          console.log(res[i]);
          App.ipfs.getHashFromIPFS(res[i].LogsHash).then((ip) =>{
            console.log(ip);
            App.ipfsConversion = JSON.parse(Buffer.from(ip.value.buffer).toString());
              console.log(this.ipfsConversion);
              console.log('Status');
              console.log(App.ipfsConversion.Status);
              if(App.ipfsConversion.Status == "BOL Approved"){
                this.bolStatus=true;
              }
          });
      }
    });
  }
  approve(){
    console.log('getBOLData');
    console.log('1.Date');
    const datePack = new Date();
    const dateValue = datePack.toDateString();
    console.log(dateValue);
    console.log('2.Time');
    const getTimeNow = datePack.getTime();
    const currentTime = getTimeNow;
    console.log(currentTime);

    console.log('id',(<HTMLIonSearchbarElement>document.getElementById('BOL_bl_no')).innerHTML);
    const BOLNO = (<HTMLIonSearchbarElement>document.getElementById('BOL_bl_no')).innerHTML;

    const dataResponse = new Array();

    console.log('BOLData');
    console.log(BOLNO);
      //hashing log data
      console.log('UserDetails');
      console.log(App.userDetails);
      const ipfsdatas = {
        BOLNo: BOLNO,
        UserID: App.userDetails._id,
        firstName: App.userDetails.firstName,
        lastName: App.userDetails.lastName,
        email: App.userDetails.email,
        Date: dateValue, //to
        Time: currentTime,
        Status:'BOL Approved'
      };
      console.log('ipfsfiles');
      console.log(ipfsdatas);
      App.ipfs.saveToIpfs(ipfsdatas).then((ipfssaveddata)=>{
        console.log('save ipfs data');
        console.log(ipfssaveddata);
        //save bol and ipfsHash in mongo
        let logSavedValue = {
          BOLNO:BOLNO,
          LogsHash: ipfssaveddata,
        };
        App.http.post('https://bolviewapibackend.herokuapp.com/users/logsave',logSavedValue).subscribe(res=>{
        console.log('Approval Completed');
        console.log(logSavedValue);
        this.presentAlert();
      });
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'BOL Approval Completed',
      // message: 'Clic',
      buttons: [
      {
          text: 'Ok',
          handler: () => {

           this.router.navigateByUrl('');
          }
        }

    ]
  });

   alert.present();

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
