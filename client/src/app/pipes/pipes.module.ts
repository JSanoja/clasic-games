import { ModuleWithProviders, NgModule } from '@angular/core';
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
  static forRoot(): ModuleWithProviders<PipesModule> {
    return {
        ngModule: PipesModule,
        providers: [],
    };
 }
}
