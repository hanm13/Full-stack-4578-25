import { Injectable } from "@angular/core";
import { RootObject } from "../models/book-root-object.model";
import { HttpClient } from "@angular/common/http";


//מאפשר לשירות הנוכחי להשתמש בתוכו בשירותים אחרים
@Injectable()
export class BookService {
    selectedBook = { selected: undefined };
    bookInfo: RootObject = { items: [] };

    constructor(private myHttpClient: HttpClient) {
        this.initBooks("a");
    }

    initBooks(query): void {
        let apiUrl:string=`https://jbbookstore.herokuapp.com/api/books/${query}`;
        
        this.myHttpClient.get(apiUrl)
            .subscribe((x: RootObject) => { this.bookInfo.items = x.items; });
    }

}