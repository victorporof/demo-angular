import { Component, ViewEncapsulation } from '@angular/core';

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-root',
  template: ` <section>
    <app-button label="-" (handleClick)="decrement()"></app-button>
    <app-label [counter]="counter"></app-label>
    <app-button label="+" (handleClick)="increment()"></app-button>
  </section>
  <a href="https://github.com/jecfish/demo-angular">GitHub</a>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  counter = 0;

  async increment() {
    await Promise.resolve().then(() => timeout(100));

    let x;

    try {
      const numRes = await fetch('/random-number').then((n) => {
        if (n.status === 404) throw new Error('wrong url');
        return n;
      });

      x = await numRes.text().catch((err: any) => {
        throw err;
      });
    } finally {
      this.counter = this.counter + +(x || 1);
      // console.trace('incremented');
    }
  }

  async decrement() {
    await Promise.resolve().then(() => timeout(100));
    this.counter--;
    throw new Error('not decremented');
  }
}
