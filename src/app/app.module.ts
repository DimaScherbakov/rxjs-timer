import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { GetStartTimeComponent } from './get-start-time/get-start-time.component';

@NgModule({
  declarations: [AppComponent, TimerComponent, GetStartTimeComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
