export interface User {

    _id?: string;
    personID?: string;
    firstName?: string;
    lastName?: string;
    userName: string;
    password?: string;
    city?: string;
    street?: string;
    token?: string;
    role?: Number;
    cart?: any;
    cartItems?: any;
}
