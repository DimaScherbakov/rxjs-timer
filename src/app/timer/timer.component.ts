import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { takeWhile, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  startTime = new Date(0, 0, 0, 0, 0, 5);
  currentTime = new Date();
  timer$: Observable<any>;
  timerOnGoing;
  constructor() {}

  ngOnInit() {
    this.setCurrentTime();
    this.timer$ = this.createTimer(this.startTime);
  }
  createTimer(startTime) {
    return interval(1000);
  }

  startStop() {
    // toggle start/stop
    this.setCurrentTime();
    if (this.timerOnGoing && !this.timerOnGoing.isStopped) {
      this.timerOnGoing.unsubscribe();
      return;
    }
    this.timerOnGoing = this.timer$
      // stop timer if it's gone
      .pipe(takeWhile(data => this.isTimerStopped(this.currentTime)))
      // set start time after timer is gone
      .pipe(
        tap({
          complete: () => {
            this.setCurrentTime();
            this.timerOnGoing.unsubscribe();
          }
        })
      )
      // decrease time
      .pipe(
        map(() => {
          this.currentTime.setSeconds(this.currentTime.getSeconds() - 1);
        })
      )
      .subscribe(() => {});
  }
  isTimerStopped(time: Date) {
    return time.getHours() + time.getMinutes() + time.getSeconds() !== 0;
  }
  setCurrentTime() {
    this.currentTime.setHours(this.startTime.getHours());
    this.currentTime.setMinutes(this.startTime.getMinutes());
    this.currentTime.setSeconds(this.startTime.getSeconds());
  }
  reset() {
    this.currentTime.setHours(0);
    this.currentTime.setMinutes(0);
    this.currentTime.setSeconds(0);
    if (this.timerOnGoing) {
      this.timerOnGoing.unsubscribe();
    }
  }
}
