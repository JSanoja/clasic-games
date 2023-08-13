
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ItemModel, ItemModelInterface } from 'src/app/model/item';

@Component({
  selector: 'jsan-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input("item") item: ItemModel;
  @Output("show") showEvent = new EventEmitter<boolean>();
  @Output("flag") flagEvent = new EventEmitter();
  constructor() {

  }
  ngOnInit(): void {
  }
  show(): void {
    this.showEvent.emit(true);
  }
  onFlag(e: MouseEvent) {
    this.flagEvent.emit()
    return false;
  }
}
