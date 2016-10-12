import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rate: number;
  @Input() scale: number;

  private static readonly starsCount = 10;

  private stars: number[] = [];
  private starsHalf: number[] = [];
  private starsBorder: number[] = [];

  constructor() { }

  ngOnInit() {
    if (this.rate < this.scale) {
      let partWeight = this.scale / RatingComponent.starsCount;
      this.stars = new Array(Math.floor(this.rate / partWeight));
      let partial = this.rate - this.stars.length * partWeight;
      let temp =  Math.round(2 * partial / partWeight);
      if (temp === 2) {
        this.stars = new Array(this.stars.length + 1);
      } else if(temp === 1) {
        this.starsHalf = new Array(1);
      }
      this.starsBorder = new Array(RatingComponent.starsCount - this.stars.length - this.starsHalf.length);
    } else {
      this.stars = new Array(RatingComponent.starsCount);
    }
  }

}
