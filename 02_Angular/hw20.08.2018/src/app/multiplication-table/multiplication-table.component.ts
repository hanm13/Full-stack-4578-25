import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiplication-table',
  templateUrl: './multiplication-table.component.html',
  styleUrls: ['./multiplication-table.component.css']
})
export class MultiplicationTableComponent implements OnInit {

  testArray: any = [];

  constructor() {
    this.testArray = [1,2,3,4,5,6,7,8,9];

  }

  ngOnInit() {
  }

}
