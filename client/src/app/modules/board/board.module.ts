import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { BoardRoutingModule } from './board-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    BoardComponent,
    ItemComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    PipesModule
  ]
})
export class BoardModule { }
