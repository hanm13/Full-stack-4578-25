import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user-service.services";
import { User } from "../shared/models/user.model";
import { FormGroup, FormControl, ValidatorFn } from "@angular/forms";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  //----------------PROPERTIRS-------------------
  loginForm: FormGroup;
  registerForm: FormGroup;
  state: string = "login";
  user: User;

  constructor(private myUserService: UserService) {

    this.user = this.myUserService.currentUser;

    let loginGroupConfig = {
      userName: this.getFormControl(2,15,"user name"),
      userPassword: this.getFormControl(5,10,"password")
    };

    
    let registerGroupConfig = {
        userName: this.getFormControl(2,15,"user name"),
        userPassword: this.getFormControl(5,10,"password"),
        firstName:this.getFormControl(2,15,"first name"),
        lastName:this.getFormControl(2,15,"last name")
    }

    this.loginForm = new FormGroup(loginGroupConfig);
    this.registerForm=new FormGroup(registerGroupConfig);
  }

  getFormControl(min,max,label){
      return new FormControl("testt",[
        f => (!f.value && !f.pristine ? { err: `${label} is required` } : null),
        f => f.value && f.value.length >= max ? { err: `${label} is max ${max} chars` }: null,
        f =>f.value && f.value.length < min ? { err: `${label} is min ${min} chars` } : null
      ]);
  }

  changeState(newState: string) {
    this.state = newState;
  }

  loginUser() {
      console.log( this.loginForm.value)
    this.myUserService.loginUser({
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.userPassword
    });
    this.loginForm.reset();

    
  }
  registerUser() {
    this.myUserService.registerUser({
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      userName: this.registerForm.value.userName,
      password: this.registerForm.value.userPassword
    });

    this.registerForm.reset();
  }

  logout() {
    this.myUserService.currentUser.userName = "Guest";
    this.myUserService.currentUser.token = undefined;
  }
  ngOnInit() {}
}
