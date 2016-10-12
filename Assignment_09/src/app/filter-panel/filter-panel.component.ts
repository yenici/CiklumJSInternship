import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent {
  @Input() types: Array<string>;
  @Input() filter: string;

  @Output() onSetFilter = new EventEmitter<string>();

  constructor() { }

  onFilterClick(filter: string) {
    if (this.filter !== filter) {
      this.onSetFilter.emit(filter);
    }
  }
}
