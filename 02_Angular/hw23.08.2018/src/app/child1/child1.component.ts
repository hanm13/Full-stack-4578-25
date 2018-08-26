import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit {


  @Input() movies: { id: number, movie_name: string, price: string, movie_date: string }[];
  @Output() movieClicked:EventEmitter<any>=new EventEmitter<any>();

  onMovieClick(movie){

    this.movieClicked.emit(movie);

  }

  constructor() { }

  ngOnInit() {
  }

}
