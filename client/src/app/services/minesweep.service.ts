import { Injectable } from '@angular/core';
import { ItemModel } from '../model/item';
import { Subject } from 'rxjs';
import { IDifficulty } from '../model/difficulty';
@Injectable({
  providedIn: 'root'
})
export class MinesweepService {
  difficulty: Array<IDifficulty> = [
    { name: 'easy', X: 5, Y: 5, mines: 3},
    { name: 'normal', X: 10, Y: 10, mines: 8},
    { name: 'hard', X: 15, Y: 15, mines: 12}
  ];
  X = 5;
  Y = 5;
  mines = 3;
  flags = 0;
  board: Array<Array<ItemModel>> = [];
  minesArray: Array<number> = [];
  boardChange$ = new Subject<any>();
  status = 'ingame';
  currentDifficulty = 'easy';
  constructor() { }
  generateBoard(): void {
    this.board = [];
    for (let i = 0; i < this.X; i++) {
      this.board.push([]);
      for (let j = 0; j < this.Y; j++) {
        this.board[i].push(new ItemModel({ num: 0, mine: false}));
      }
    }
    this.generateArrayMines();
    this.generateMines();
    this.generateNumbers();
  }
  generateMines(): void {
    let count = 0;
    for (let i = 0; i < this.X; i++) {
      for (let j = 0; j < this.Y; j++) {
        if (this.minesArray.includes(count)) {
          this.board[i][j].setMine(true);
        }
        count++;
      }
    }
  }
  generateNumbers(): void{
    for (let i = 0; i < this.X; i++) {
      for (let j = 0; j < this.Y; j++) {
        if (!this.board[i][j].getMine()) {
          let num = 0;
          if (this.board?.[i - 1]?.[j - 1]?.getMine() || false) { num++; }
          if (this.board?.[i - 1]?.[j]?.getMine() || false) { num++; }
          if (this.board?.[i - 1]?.[j + 1]?.getMine() || false) { num++; }
          if (this.board?.[i]?.[j - 1]?.getMine() || false) { num++; }
          if (this.board?.[i]?.[j + 1]?.getMine() || false) { num++; }
          if (this.board?.[i + 1]?.[j - 1]?.getMine() || false) { num++; }
          if (this.board?.[i + 1]?.[j]?.getMine() || false) { num++; }
          if (this.board?.[i + 1]?.[j + 1]?.getMine() || false) { num++; }
          this.board[i][j].setNum(num);
        }
      }
    }
  }
  getRandomUniqueNumber(min: number, max: number): number {
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    if (this.minesArray.includes(rand)) {
      return this.getRandomUniqueNumber(min, max);
    }
    return rand;
  }
  generateArrayMines(): void {
    let i = 0;
    this.minesArray = [];
    while (i < this.mines) {
      i++;
      this.minesArray.push(this.getRandomUniqueNumber(0, this.X * this.Y));
    }
  }
  getBoard(): Array<Array<ItemModel>> {
    return this.board;
  }
  updateZeros(): void {
    for (let i = 0; i < this.X; i++) {
      for (let j = 0; j < this.Y; j++) {
        if (!this.board[i][j].getMine() && this.board[i][j].getNum() === 0 && this.board[i][j].visible) {
          if (this.board?.[i - 1]?.[j - 1] || false) { this.board[i - 1][j - 1].visible = true; }
          if (this.board?.[i - 1]?.[j] || false) { this.board[i - 1][j].visible = true; }
          if (this.board?.[i - 1]?.[j + 1] || false) { this.board[i - 1][j + 1].visible = true; }
          if (this.board?.[i]?.[j - 1] || false) { this.board[i][j - 1].visible = true; }
          if (this.board?.[i]?.[j + 1] || false) { this.board[i][j + 1].visible = true; }
          if (this.board?.[i + 1]?.[j - 1] || false) { this.board[i + 1][j - 1].visible = true; }
          if (this.board?.[i + 1]?.[j] || false) { this.board[i + 1][j].visible = true; }
          if (this.board?.[i + 1]?.[j + 1] || false) { this.board[i + 1][j + 1].visible = true; }
          this.board[i][j].setNum(-1);
          if (this.isSomeZeros()) { this.updateZeros(); }
        }
      }
    }
  }
  isSomeZeros(): boolean {
    for (let i = 0; i < this.X; i++) {
      for (let j = 0; j < this.Y; j++) {
        if (this.board[i][j].visible && this.board[i][j].flag) {
          this.board[i][j].flag = false;
          this.flags--;
        }
        if (!this.board[i][j].getMine() && this.board[i][j].getNum() === 0 && this.board[i][j].visible) { return true; }
      }
    }
    return false;
  }
  setDifficulty(item: IDifficulty): void {
    this.X = item.X;
    this.Y = item.Y;
    this.mines = item.mines;
    this.status = 'ingame';
    this.currentDifficulty = item.name;
    this.flags = 0;
    this.generateBoard();
  }
  validate(): boolean {
    const valid = true;
    let countValid = 0;
    for (let i = 0; i < this.X; i++) {
      for (let j = 0; j < this.Y; j++) {
        if (this.board[i][j].getMine() && this.board[i][j].visible) {
          this.status = 'lose';
          return false;
        }
        if (this.board[i][j].visible) {
          countValid++;
        }

      }
    }
    if (countValid === this.Y * this.X - this.mines) {
      this.status = 'won';
      return false;
    }
    return valid;
  }
  disableButtons(): void {
    for (let i = 0; i < this.X; i++) {
      for (let j = 0; j < this.Y; j++) {
        this.board[i][j].disabled = true;
      }
    }
  }
}
