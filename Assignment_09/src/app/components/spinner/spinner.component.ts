import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  // constructor() {}
  taskCounter: number = 0;
    
  startSpinner() {
    this.taskCounter += 1;
  }

  stopSpinner() {
    if (this.taskCounter > 0) {
      this.taskCounter -= 1
    }
  }

  ngOnInit() {
  }

}
