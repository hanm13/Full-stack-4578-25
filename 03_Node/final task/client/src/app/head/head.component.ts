import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user-service.services";
import { User } from "../shared/models/user.model";

@Component({
  selector: "app-head",
  templateUrl: "./head.component.html",
  styleUrls: ["./head.component.css"]
})
export class HeadComponent implements OnInit {
  user: User;
  constructor(private myUserService: UserService) {
    this.user = this.myUserService.currentUser;
  }

  ngOnInit() {}
}
