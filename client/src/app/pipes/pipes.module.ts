import { NgModule } from '@angular/core';
import { TimerPipe } from './timer.pipe';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CommonModule],
  declarations: [TimerPipe],
  exports: [TimerPipe, CommonModule],
  providers: [],
  bootstrap: []
})
export class PipesModule {
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [],
    };
 }
}
