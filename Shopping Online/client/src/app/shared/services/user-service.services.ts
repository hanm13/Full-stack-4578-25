import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { hash } from './sha-convertor.service'
import { Book } from "../models/book.model";

//מאפשר לשירות הנוכחי להשתמש בתוכו בשירותים אחרים
@Injectable()
export class UserService {
    currentUser:User={userName:"Guest", token:undefined, cart:[]};


    constructor(private myHttpClient: HttpClient) {}


    loginUser(loginUser:User): void {
        let apiUrl:string=`https://jbbookstore.herokuapp.com/api/users`;
        

        let hashPassword=hash(loginUser.password);
        this.myHttpClient.get(apiUrl, {
            observe: 'response',
            headers: {
                "xx-auth": `${hashPassword}${loginUser.userName}`
            }})
            .subscribe((resp) => {
                this.currentUser.token=resp.headers.get('xx-auth');
                this.currentUser.cart=<Book[]>resp.body;
                this.currentUser.userName=loginUser.userName;
            });
    }


    registerUser(newUser:User):void{
        let apiUrl:string=`https://jbbookstore.herokuapp.com/api/users`;
        newUser.password=hash(newUser.password);
        
        this.myHttpClient.post(apiUrl,newUser,{observe: 'response'})
        .subscribe((resp) => {
            this.currentUser.token=resp.headers.get('xx-auth');
            this.currentUser.userName=newUser.userName;
        });
    }


    editUserCart(bookId:string, isAddMode:boolean):void{
        let apiUrl:string=`https://jbbookstore.herokuapp.com/api/users`;
 
        this.myHttpClient.put(apiUrl,{
            "bookId":bookId,
            "isAddMode": isAddMode
        } ,
        {
            observe: 'response',
            headers: {
                "xx-auth": this.currentUser.token
            }})
        .subscribe((resp) => {
            this.currentUser.cart=<Book[]>resp.body;
            console.log(resp);
        });
    }

}