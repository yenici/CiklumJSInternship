import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  @Input()
  types: Array<string>;
    @Input()
  filter: string;

  constructor() { }

  ngOnInit() {
  }

}
