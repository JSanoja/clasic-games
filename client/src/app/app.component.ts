import { Component, OnInit } from '@angular/core';
import { MinesweepService } from './services/minesweep.service';

@Component({
  selector: 'jsan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Minesweep by Eng. Juan Sanoja';
  constructor(private minesService: MinesweepService) {

  }
  ngOnInit(): void {
    this.minesService.generateBoard();
  }
}
