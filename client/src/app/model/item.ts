export class ItemModel {
  mine:boolean;
  num:number;
  visible:boolean = false;
  flag:boolean = false;
  disabled: boolean = false;
  constructor(item:ItemModelInterface) {
    this.mine = item.mine;
    this.num = item.num;
  }
  setMine (mine : boolean) {
    this.mine = mine;
  }
  getMine() {
    return this.mine;
  }
  setNum (num : number) {
    this.num = num;
  }
  getNum() {
    return this.num;
  }
}
export interface ItemModelInterface{
  mine:boolean;
  num:number;
}
