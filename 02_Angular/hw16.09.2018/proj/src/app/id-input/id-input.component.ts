import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { Person } from "../shared/models/person.model";
import{ PersonService } from "../shared/services/person.service";

@Component({
  selector: 'app-id-input',
  templateUrl: './id-input.component.html',
  styleUrls: ['./id-input.component.css']
})
export class IdInputComponent implements OnInit {

  //----------------PROPERTIRS-------------------
   myForm: FormGroup;
   person: Person[] = [];
   id_service;


   //----------------CONSTRUCTOR------------------
   constructor(private myService: PersonService) {

    this.id_service = this.myService;
    this.person = this.myService.getAllPeople();

     let formGroupConfig = {
       userName: new FormControl("Chen",[
         f => !f.value ? { "err": `name is required` } : null,
         f => f.value && f.value.length > 15 ? { "err": `name is max 15 chars` } : null,
         f => f.value && f.value.length < 3 ? { "err": `name is min 3 chars` } : null
       ]),

       identity: new FormControl("123456789", [
         f => !f.value ? { "err": `ID is required` } : null,
         f => f.value && f.value.length > 9 ? { "err": `ID is max 9 chars` } : null,
         function(f){
           if(f.value && f.value.length){

             let tempValArr = f.value.toString().split("");

             // A

             if (tempValArr.length < 9){
               for (let i = 0; i < tempValArr.length; i++) {
                 if (tempValArr.length < 9){
                   tempValArr.unshift("0");
                 }
             }
            }


             // B
             let accessoriesNumbers = [1,2,1,2,1,2,1,2,1];
             let accessoriesValueArr = [];

             // C

             for (let acc_num = 0; acc_num < accessoriesNumbers.length; acc_num++) {

               accessoriesValueArr.push(accessoriesNumbers[acc_num] * tempValArr[acc_num]);

              }

              //D

              for (let acc_value = 0; acc_value < accessoriesValueArr.length; acc_value++) {
                  if(accessoriesValueArr[acc_value] > 9){

                    var tempNum = Math.floor(accessoriesValueArr[acc_value] / 10);
                    var tempNum2 = accessoriesValueArr[acc_value] % 10;

                    accessoriesValueArr[acc_value] = tempNum + tempNum2;
                  }
              }

             let counter = 0;
             for (let i = 0; i < accessoriesValueArr.length; i++) {
                 counter += accessoriesValueArr[i];
             }

             if (counter % 10 == 0){


               return null;

             }else{

               return { "err": `Invalid ID!` };

             }



           }
         },

       ])
     };

     this.myForm = new FormGroup(formGroupConfig);
   }

  ngOnInit() {
  }

  submitPerson(person_name,person_id){

    let person:any = {

      "name":person_name,
      "person_identity":person_id

    }

    this.id_service.insertPerson(person);

  }

}
