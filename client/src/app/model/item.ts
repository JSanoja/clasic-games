export class ItemModel {
  mine: boolean;
  num: number;
  visible = false;
  flag = false;
  disabled = false;
  constructor(item: ItemModelInterface) {
    this.mine = item.mine;
    this.num = item.num;
  }
  setMine(mine: boolean): void {
    this.mine = mine;
  }
  getMine(): boolean {
    return this.mine;
  }
  setNum(num: number): void {
    this.num = num;
  }
  getNum(): number {
    return this.num;
  }
}
export interface ItemModelInterface{
  mine: boolean;
  num: number;
}
