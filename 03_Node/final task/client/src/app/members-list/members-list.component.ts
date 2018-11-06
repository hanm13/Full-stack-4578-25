import { Component, OnInit } from '@angular/core';

import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user-service.services';

@Component({
    selector: 'app-members-list',
    templateUrl: './members-list.component.html',
    styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
    public user: User;
    public localUserData: any;

    public constructor(private myUserService: UserService) {

        this.user = this.myUserService.currentUser;
        this.localUserData = this.myUserService.membersList;

    }

    ngOnInit() {
      this.myUserService.getMembersList();
    }

    deleteMember(id) {

      console.log(this.localUserData);
      this.myUserService.deleteMember(id);
      console.log(this.localUserData);
    }

}
