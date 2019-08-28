import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  startTime = new Date(0, 0, 0, 0, 0, 3);
  timer$: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.timer$ = this.createTimer(this.startTime);
  }
  createTimer(startTime) {
    return interval(1000);
  }

  startStop() {
    this.timer$
      .pipe(takeWhile(data => this.isTimerStopped(this.startTime)))
      .subscribe(value => {
        this.startTime.setSeconds(this.startTime.getSeconds() - 1);
        console.log(this.startTime);
      });
  }
  isTimerStopped(time: Date) {
    return time.getHours() + time.getMinutes() + time.getSeconds() !== 0;
  }
}
