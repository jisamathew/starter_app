import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {IpfsService} from '../service/ipfs.service';

var App;
declare const Buffer;
@Component({
  selector: 'app-bollog',
  templateUrl: './bollog.page.html',
  styleUrls: ['./bollog.page.scss'],
})
export class BOLlogPage implements OnInit {
public logValues = [];
  bolNo: string;
  // logValues: any[];
  // logValues: any = [];

  ipfsConverted: any;
  constructor(private http: HttpClient,public ipfs: IpfsService) {
    App = this;
   }

  ngOnInit() {
  }

  search(){
  console.log('login works');
  console.log('this.BOL');
  console.log(this.bolNo);
  this.http.get('https://bolviewapibackend.herokuapp.com/users/BOLlog/'+this.bolNo).subscribe((res: any[])=>{
    console.log('Getting log of BOl searched') ;
    console.log(res);

    for (let i = 0; i < res.length; i++) {
        console.log(res[i]);
        App.ipfs.getHashFromIPFS(res[i].LogsHash).then((ip) =>{
          console.log(ip);
          App.ipfsConverted = JSON.parse(Buffer.from(ip.value.buffer).toString());
            console.log(this.ipfsConverted);
            App.logValues.push(App.ipfsConverted);
            // console.log(this.logValues);


        })
    }
  })

      // // resp(this.totalProduct);
      }



}

