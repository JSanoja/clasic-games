import { Injectable } from '@angular/core';
import { ILeaderBoard } from '../model/leader-board';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  dictionary = {
    custom:3,
    easy: 2,
    normal: 1,
    hard:0
  }
  constructor() { }
  getLeaderBoard() : Array<ILeaderBoard> {
    let leaderBoard = JSON.parse(localStorage.getItem('leaderBoard')) as Array<ILeaderBoard>;
    if (leaderBoard.length > 0) leaderBoard.sort((a, b) => (a.totalTimeSpent - b.totalTimeSpent)).sort((a, b) => {
      let difficultyA = this.dictionary[a.difficulty]
      let difficultyB = this.dictionary[b.difficulty]
      return difficultyA - difficultyB
    });
    return leaderBoard;
  }
  setLeaderBoard(leaderBoard:Array<ILeaderBoard>) : void {
    localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard))
  }
  addGame(record: ILeaderBoard) {
    let leaderBoard = this.getLeaderBoard() || [];
    leaderBoard.push(record);
    this.setLeaderBoard(leaderBoard);
  }
}
