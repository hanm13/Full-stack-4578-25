import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

// ----------------PROPERTIRS-------------------
editForm: FormGroup;
user: User;
editMsg: any = '';
editMember: any = {member: {}};

  constructor(private myUserService: UserService, private route: ActivatedRoute) {

    this.user = this.myUserService.currentUser;

    // we get the user ID from the URL and than we filter the user from the members array
    this.editMember.member = this.myUserService.membersList.members.filter((el) => el._id === route.snapshot.params.id )[0];

    console.log('edited member: ', this.editMember.member );

    const editGroupConfig = {
        id: this.getFormControl(64, 64, 'id', true),
        userName: this.getFormControl(2, 15, 'user name'),
        password: this.getFormControl(5, 10, 'password'),
        name: this.getFormControl(2, 15, 'first name'),
        lastName: this.getFormControl(2, 15, 'last name'),
        email: this.getFormControl(5, 40, 'email')

    };

    this.editForm = new FormGroup(editGroupConfig);
  }

  getFormControl(min, max, label, disabled = false) {
      return new FormControl( {value: '', disabled : disabled} , [
        f => (!f.value && !f.pristine ? { err: `${label} is required` } : null),
        f => f.value && f.value.length >= max ? { err: `${label} is max ${max} chars` } : null,
        f => f.value && f.value.length < min ? { err: `${label} is min ${min} chars` } : null
      ]);
  }

  editUser() {

    const editedUser = {

      _id: (this.editForm.value.id && this.editForm.value.id !== '') ? this.editForm.value.id : this.editMember.member._id,
      name: (this.editForm.value.name && this.editForm.value.name !== '') ? this.editForm.value.name : this.editMember.member.name,
      // tslint:disable-next-line:max-line-length
      lastName: (this.editForm.value.lastName && this.editForm.value.lastName !== '') ? this.editForm.value.lastName : this.editMember.member.lastName,
      userName: (this.editForm.value.userName !== '') ? this.editForm.value.userName : this.editMember.member.userName,
      password: (this.editForm.value.password !== '') ? this.editForm.value.password : this.editMember.member.password,
      email: (this.editForm.value.email !== '') ? this.editForm.value.email : this.editMember.member.email

    };

    this.myUserService.editUser(editedUser);
    this.editMsg = `You succesfully edited the user! - ${ new Date().toTimeString() }`;

    //this.editForm.reset();
  }

  ngOnInit() {
    this.myUserService.getMembersList();
  }

}
