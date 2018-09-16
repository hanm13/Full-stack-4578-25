import { Person } from "../models/person.model";
import { PeopleStore } from "../models/person-store.model";

import { Injectable } from "@angular/core";

@Injectable()
export class PersonService {

  getAllPeople(): Person[] {
    return PeopleStore.peopleList;
  }

  insertPerson(person){



    if (person.person_identity.length < 9){

      let tempValArr = person.person_identity.toString().split("");

      for (let i = 0; i < tempValArr.length; i++) {
        if (tempValArr.length < 9){
          tempValArr.unshift("0");
        }
      }

      let tempString:string="";

      for (let i = 0; i < tempValArr.length; i++) {
          tempString = tempString + "" + tempValArr[i];
      }

      person.person_identity = tempString;

    }

    PeopleStore.peopleList.push(person);

  }

}
