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
  isStarted;
  isReset;
  constructor() {}

  ngOnInit() {
    this.setCurrentTime();
    this.timer$ = this.createTimer(this.startTime);
  }
  createTimer(startTime) {
    return interval(1000);
  }

  start() {
    this.isStarted = true;
    this.timerOnGoing = this.timer$
      // stop timer if it's gone
      .pipe(takeWhile(data => this.isTimerStopped(this.currentTime)))
      // set start time after timer is gone
      .pipe(
        tap({
          complete: () => {
            this.setCurrentTime();
            this.isStarted = false;
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
  stop() {
    this.isStarted = false;
    this.setCurrentTime();
    if (this.timerOnGoing) {
      this.timerOnGoing.unsubscribe();
    }
  }
  startStop() {
    // toggle start/stop
    if (this.isReset) {
      this.isReset = false;
      this.setCurrentTime();
    }
    this.isStarted ? this.stop() : this.start();
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
    this.isStarted = false;
    this.isReset = true;
    this.currentTime.setHours(0);
    this.currentTime.setMinutes(0);
    this.currentTime.setSeconds(0);
    if (this.timerOnGoing) {
      this.timerOnGoing.unsubscribe();
    }
  }
  wait() {
    if (this.timerOnGoing) {
      this.isStarted = false;
      this.timerOnGoing.unsubscribe();
    }
  }
}
