import { Component } from '@angular/core';

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  counter = 0;

  async increment() {
    await Promise.resolve().then(() => timeout(100));
    this.counter++;
    console.trace("incremented");
  }

  async decrement() {
    await Promise.resolve().then(() => timeout(100));
    this.counter--;
    throw new Error("not decremented");
  }
}
