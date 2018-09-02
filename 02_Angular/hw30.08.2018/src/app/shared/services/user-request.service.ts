import { HttpClient } from "@angular/common/http";
import { Users } from "../models/users.model";
import { Injectable } from "@angular/core";

@Injectable()
export class UserRequestService {

  userData: { users: Users } = {
    users: undefined
  };

  httpService:any;

  constructor(private myHttp: HttpClient) {
    this.httpService = this.myHttp;
    /*this.myHttp.get("https://reqres.in/api/users?page=2")
    .subscribe(
        (response:Users)=>{this.userData.users=response;}
    );*/

  }

  showUsersByPage(page:number): void{

    this.httpService.get(`https://reqres.in/api/users?page=${page}`)
    .subscribe(
        (response:Users)=>{this.userData.users=response;}
    );

  }


}

/*
get
 ____
 function of HttpClient
 takes as parameter a string (the url to the server)
 return — an Observable of the body as an Object
 ---------------------------------------------------

subscribe
 _____
 function of Observable
 takes as parameter a function that takes one parameter



*/
