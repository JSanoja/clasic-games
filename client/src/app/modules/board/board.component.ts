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
  timer:Date;
  timerToConvert:number = 0;
  lastTimer:number = 0;
  score:number = 0;
  gameFinished:boolean = false;
  constructor(private minesService: MinesweepService, private storage : StorageService) { }
  ngOnInit(): void {
    this.score = this.minesService.mines - this.minesService.flags;
    this.minesService.boardChange$.subscribe(() => {
      this.minesService.updateZeros();
      if (!this.minesService.validate()) {
        this.lastTimer = this.timerToConvert;
        this.minesService.disableButtons();
        this.gameFinished = true;
        let record : ILeaderBoard = {
          name: "JM",
          startTime: this.timer,
          endTime: new Date(this.lastTimer),
          totalTimeSpent: this.timerToConvert,
          status: this.minesService.status,
          difficulty: this.minesService.currentDifficulty
        }
        this.storage.addGame(record);
      }
    })
    this.setTimer()
  }
  setTimer(): void {
    this.timer = new Date(Date.now());
    setInterval(() => {
      this.timerToConvert = Date.now() - this.timer.getTime();
    }, 500)
  }
  getBoard(): any {
    return this.minesService.getBoard()
  }
  actionShow(e:boolean, y:ItemModel) {
    y.visible = e;
    y.flag = false;
    this.minesService.boardChange$.next();
  }
  actionFlag(y:ItemModel) {
    y.flag = !y.flag;
    if (y.flag) this.minesService.flags++;
    if (!y.flag) this.minesService.flags--;
    this.score = this.minesService.mines - this.minesService.flags;
  }
  getStatus() {
    return this.minesService.status
  }

}
