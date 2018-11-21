import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { hash } from './sha-convertor.service';
import { Book } from '../models/book.model';
import { Key } from 'selenium-webdriver';

// מאפשר לשירות הנוכחי להשתמש בתוכו בשירותים אחרים
@Injectable()
export class UserService {
    currentUser: User = { firstName: 'Guest', userName: 'Guest', token: undefined};


    constructor(private myHttpClient: HttpClient) {}


    loginUser(loginUser: User): void {

        const apiUrl = `http://localhost:6200/api/users`;


        const hashPassword = hash(loginUser.password);
        this.myHttpClient.get(apiUrl, {
            observe: 'response',
            headers: {
                'xx-auth': `${hashPassword}${loginUser.userName}`
            }})
            .subscribe((resp) => {

                for (const key in resp.body) {
                    if (resp.body.hasOwnProperty(key)) {
                        this.currentUser[key] = resp.body[key];
                    }
                }

                this.currentUser.token = resp.headers.get('xx-auth');
            });
    }


    registerUser(newUser: User): void {
        const apiUrl = `http://localhost:6200/api/users`;
        newUser.password = hash(newUser.password);

        this.myHttpClient.post(apiUrl, newUser, {observe: 'response'})
        .subscribe((resp) => {

            for (const key in resp.body) {
                if (resp.body.hasOwnProperty(key)) {
                    this.currentUser[key] = resp.body[key];
                }
            }

            this.currentUser.token = resp.headers.get('xx-auth');

        });
    }

    validateUserRegister(newUser) {

        console.log(newUser);


        return new Promise((resolve, reject) => {

            this.myHttpClient.post('http://localhost:6200/api/users/validateRegister', newUser, {observe: 'response'})
            .subscribe((resp) => {
                resolve(resp);
            }, (err) => {

                reject(err);

            });

        });



    }


    // editUserCart(bookId: string, isAddMode: boolean): void {
    //     const apiUrl = `http://localhost:6200/api/users`;

    //     this.myHttpClient.put(apiUrl, {
    //         'bookId': bookId,
    //         'isAddMode': isAddMode
    //     } ,
    //     {
    //         observe: 'response',
    //         headers: {
    //             'xx-auth': this.currentUser.token
    //         }})
    //     .subscribe((resp) => {
    //         //this.currentUser.cart = <Book[]>resp.body;
    //         console.log(resp);
    //     });
    // }

}
