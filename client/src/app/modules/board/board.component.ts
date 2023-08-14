import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/model/item';
import { ILeaderBoard } from 'src/app/model/leader-board';
import { MinesweepService } from 'src/app/services/minesweep.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'jsan-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: any;
  timer: Date;
  timerToConvert = 0;
  lastTimer = 0;
  score = 0;
  gameFinished = false;
  constructor(private minesService: MinesweepService, private storage: StorageService) { }
  ngOnInit(): void {
    this.score = this.minesService.mines - this.minesService.flags;
    this.minesService.boardChange$.subscribe(() => {
      this.minesService.updateZeros();
      this.score = this.minesService.mines - this.minesService.flags;
      if (!this.minesService.validate()) {
        this.lastTimer = this.timerToConvert;
        this.minesService.disableButtons();
        this.gameFinished = true;
        const record: ILeaderBoard = {
          name: 'JM',
          startTime: this.timer,
          endTime: new Date(this.lastTimer),
          totalTimeSpent: this.timerToConvert,
          status: this.minesService.status,
          difficulty: this.minesService.currentDifficulty
        };
        this.storage.addGame(record);
      }
    });
    this.setTimer();
  }
  setTimer(): void {
    this.timer = new Date(Date.now());
    setInterval(() => {
      this.timerToConvert = Date.now() - this.timer.getTime();
    }, 500);
  }
  getBoard(): Array<Array<ItemModel>> {
    return this.minesService.getBoard();
  }
  actionShow(e: boolean, y: ItemModel): void {
    y.visible = e;
    y.flag = false;
    this.minesService.boardChange$.next();
  }
  actionFlag(y: ItemModel): void {
    if (!(this.gameFinished || this.minesService.flags === this.minesService.mines) || y.flag) {
      y.flag = !y.flag;
      if (y.flag) { this.minesService.flags++; }
      if (!y.flag) { this.minesService.flags--; }
      this.score = this.minesService.mines - this.minesService.flags;
    }
  }
  getStatus(): string {
    return this.minesService.status;
  }
  saveGame(): void {
    this.storage.saveBoard(this.getBoard());
  }

}
