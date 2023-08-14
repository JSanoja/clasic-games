import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerPipe'
})
export class TimerPipe implements PipeTransform {

  transform(milliseconds: number): string {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
  }
  padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
