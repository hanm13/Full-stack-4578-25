import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { Book } from '../shared/models/book.model';
import { BookService } from '../shared/services/book-service.services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public user:User;
    public constructor(private myUserService: UserService, private myBookService:BookService) {

        this.user = this.myUserService.currentUser;
    }

    public setSelectedBook(book:Book): void {
        this.myBookService.selectedBook.selected = book;      
    }

    
    public shortTitle(title:string):string{
        if(title.length>13){
            return title.substring(0,13)+"...";
        }
        return title;
    }
    
    removeFromCart(bookId:string){
        this.myUserService.editUserCart(bookId,false);
    }

    ngOnInit() {
    }

}
