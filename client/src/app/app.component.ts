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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.minesService.generateBoard()
  }
}
