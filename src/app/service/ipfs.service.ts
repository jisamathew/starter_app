import { Injectable } from '@angular/core';
const createClient = require('ipfs-http-client');

declare var require;

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  private ipfs = createClient({ host: 'ipfs.infura.io', port: 5001, protocol: "https" });

  private files_json: any;
  private ipfsHash: any;

  constructor() { }

  public async saveToIpfs(file){
    this.files_json = JSON.stringify(file);
    console.log(this.files_json);
    this.ipfsHash = await this.ipfs.add(this.files_json);
    return this.ipfsHash.path;
  }

  public async getHashFromIPFS(id){
    this.ipfsHash = await this.ipfs.cat(id);
    return this.ipfsHash.next();
  }

}
