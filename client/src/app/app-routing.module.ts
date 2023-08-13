import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/new',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadChildren: () => import('./modules/board/board.module').then(m => m.BoardModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./modules/new/new.module').then(m => m.NewModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./modules/config/config.module').then(m => m.ConfigModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./modules/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
