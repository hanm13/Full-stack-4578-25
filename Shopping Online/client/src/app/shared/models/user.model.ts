import { Book } from "./book.model";

export interface User{
    firstName?: string;
    lastName?: string;
    userName: string;
    password?: string;
    token?:string;
    cart?:Book[];
}