import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { Component } from '@angular/core';
import { ItemModel } from 'src/app/model/item';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent, TestComponentWrapper ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<jsan-item [item]="item"></jsan-item>'
})
class TestComponentWrapper {
  item = new ItemModel({mine:true, num:0})
}
