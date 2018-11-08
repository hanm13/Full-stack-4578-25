import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    currentUser: User = {userName: 'Guest'};
    membersList: any = { members: [] };

    constructor(private myHttpClient: HttpClient) {
    }

    getMembersList() {

      this.myHttpClient.get('http://localhost:7200/api/members')
      .subscribe((members: User[]) => {

        this.membersList.members = members;

      });

    }


    loginUser(loginUser: User): void {
        const apiUrl = `http://localhost:7200/api/login`;

        // we send the username and password as headers.
        this.myHttpClient.get(apiUrl, {
          headers: {
              'xx-auth-p': `${loginUser.password}`,
              'xx-auth-u': `${loginUser.userName}`,
          }})
          .subscribe((resp) => {

            this.currentUser.userName = loginUser.userName;

          });
    }


    registerUser(newUser: User): void {
        const apiUrl = `http://localhost:7200/api/members`;

        this.myHttpClient.post(apiUrl, newUser)
        .subscribe((resp) => {
            this.currentUser.userName = newUser.userName;
            this.getMembersList();
        });
    }

    deleteMember(id) {

      this.myHttpClient.delete(`http://localhost:7200/api/members/?id=${id}`)
      .subscribe((res) => {

        // filter the deleted user from the memberslist array.
        this.membersList.members = this.membersList.members.filter((el) => el._id !== id);

      });

    }

    editUser(editedUser: User): void {

      console.log(editedUser);

      const apiUrl = `http://localhost:7200/api/members/?id=${editedUser._id}`;

      this.myHttpClient.put(apiUrl, editedUser)
      .subscribe((resp) => {
          this.getMembersList();
      });
  }

}
