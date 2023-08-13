import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LeaderboardComponent } from './leaderboard.component';


@NgModule({
  declarations: [LeaderboardComponent],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    PipesModule
  ]
})
export class LeaderboardModule { }
