import { Component, OnInit } from '@angular/core';
import { ILeaderBoard } from 'src/app/model/leader-board';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'jsan-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderBoard: Array<ILeaderBoard> = null
  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.leaderBoard = this.storage.getLeaderBoard();
    console.log(this.leaderBoard)
  }


}
