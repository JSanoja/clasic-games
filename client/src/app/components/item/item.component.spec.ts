import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { Component } from '@angular/core';
import { ItemModel } from 'src/app/model/item';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent, TestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'jsan-test-component-wrapper',
  template: '<jsan-item [item]="item"></jsan-item>'
})
class TestComponent {
  item = new ItemModel({mine: true, num: 0});
}
