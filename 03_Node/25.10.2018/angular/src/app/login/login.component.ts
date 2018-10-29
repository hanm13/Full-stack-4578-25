import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    // ----------------PROPERTIRS-------------------
    myForm: FormGroup;


    // ----------------CONSTRUCTOR------------------
    constructor() {
      const formGroupConfig = {
        userName: new FormControl('BobB', [
          f => !f.value ? { 'err': `name is required` } : null,
          f => f.value && f.value.length > 15 ? { 'err': `name is max 15 chars` } : null,
          f => f.value && f.value.length < 3 ? { 'err': `name is min 3 chars` } : null
        ]),

        userPassword: new FormControl('abcde', [
          f => !f.value ? { 'err': `password is required` } : null,
          f => f.value && f.value.length > 10 ? { 'err': `password is max 10 chars` } : null,
          f => f.value && f.value.length < 4 ? { 'err': `password is min 6 chars` } : null
        ])
      };

      this.myForm = new FormGroup(formGroupConfig);
    }

    // ----------------METHODS-------------------
    submitLogin(username, password) {

      console.log(username);

      console.log('before hash pass : ', password);

      console.log(password);

      // we convert password to SHA256 then we conver the object to string

      password = CryptoJS.SHA256(password).toString();

      console.log('hashed pass :', password);

      const xxAuth = password + username ; // 36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42c + BobB
      // = 36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42cBobB

      const config: any = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
             'xx-auth': xxAuth,
        }
      };

      fetch('http://localhost:6000/api/users', config).then((data) => {

      if (data.status === 200) { // status 200 ok, login success
        alert('Successfully login!');
      }



      console.log('auth server responded', data);

      }).catch((error) => {

        alert('Authorization failed!');
        console.log('error:', error);

      });
    }

  }
