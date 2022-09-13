import { Component, ViewEncapsulation } from '@angular/core';

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-root',
  template: `
  <section>
    <app-button label="-" (handleClick)="decrement()"></app-button>
    <app-label [counter]="counter"></app-label>
    <app-button label="+" (handleClick)="increment()"></app-button>
  </section>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  counter = 0;

  async increment() {
    await Promise.resolve().then(() => timeout(100));
    const x = await (await fetch('/random-number')).text();
    this.counter = this.counter + (+x || 1);
    // console.trace('incremented');
  }

  async decrement() {
    await Promise.resolve().then(() => timeout(100));
    this.counter--;
    throw new Error('not decremented');
  }
}
