import { Injectable } from '@angular/core';
import { ILeaderBoard } from '../model/leader-board';
import { ItemModel } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  dictionary = {
    custom: 3,
    easy: 2,
    normal: 1,
    hard: 0
  };
  constructor() { }
  getLeaderBoard(): Array<ILeaderBoard> {
    const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard')) as Array<ILeaderBoard>;
    if (leaderBoard && leaderBoard.length > 0) {
      leaderBoard.sort((a, b) => {
        const difficultyA = this.dictionary[a.difficulty];
        const difficultyB = this.dictionary[b.difficulty];
        return difficultyA - difficultyB;
      }).sort((a, b) => (a.totalTimeSpent - b.totalTimeSpent));
    }
    return leaderBoard;
  }
  setLeaderBoard(leaderBoard: Array<ILeaderBoard>): void {
    localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));
  }
  addGame(record: ILeaderBoard): void {
    const leaderBoard = this.getLeaderBoard() || [];
    leaderBoard.push(record);
    this.setLeaderBoard(leaderBoard);
  }
  saveBoard(record: Array<Array<ItemModel>>): void {
    localStorage.setItem('board', JSON.stringify(record));
  }
  getSaveBoard(): Array<Array<ItemModel>> {
    const board = JSON.parse(localStorage.getItem('board')) as Array<Array<ItemModel>>;
    return board;
  }
}
