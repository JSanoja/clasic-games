
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ItemModel, ItemModelInterface } from 'src/app/model/item';

@Component({
  selector: 'jsan-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: ItemModel;
  @Output() showEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() flagEvent: EventEmitter<boolean> = new EventEmitter();
  constructor() {

  }
  ngOnInit(): void {
  }
  show(): void {
    this.showEvent.emit(true);
  }
  onFlag(e: MouseEvent): boolean {
    this.flagEvent.emit();
    return false;
  }
}
