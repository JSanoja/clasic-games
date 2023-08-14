import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { IDifficulty } from 'src/app/model/difficulty';
import { MinesweepService } from 'src/app/services/minesweep.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'jsan-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  customForm: FormGroup = new FormGroup({
    columns: new FormControl('', Validators.required),
    rows: new FormControl('', Validators.required),
    mines: new FormControl('', Validators.required),
  }, this.validMines());
  constructor(private minesService: MinesweepService, private router: Router, private storage: StorageService) { }

  ngOnInit(): void {
  }

  getDifficulty(): Array<IDifficulty> {
    return this.minesService.difficulty;
  }

  setDifficulty(item: IDifficulty): void {
    this.minesService.setDifficulty(item);
    this.router.navigateByUrl('board');
  }
  setCustomDifficulty(): void {
    this.minesService.setDifficulty({
      name: 'custom',
      X: this.customForm.get('columns').value,
      Y: this.customForm.get('rows').value,
      mines: this.customForm.get('mines').value,
    });
    this.router.navigateByUrl('board');
  }
  validMines(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cols = Number(control?.get('columns').value || 0);
      const rows = Number(control?.get('rows').value || 0);
      const mines = Number(control?.get('mines').value || 0);
      return mines > (cols * rows) ? {invalidMines: true} : null;
    };
  }
  loadBoard(): void {
    if (this.storage.getSaveBoard()) {
      this.minesService.loadBoard(this.storage.getSaveBoard());
      this.minesService.boardChange$.next();
      this.router.navigateByUrl('board');
    }
  }
}
