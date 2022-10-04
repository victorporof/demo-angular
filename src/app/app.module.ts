import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { captureException, init, routingInstrumentation } from '@sentry/angular';
import { BrowserTracing } from '@sentry/tracing';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { LabelComponent } from './label/label.component';

init({
  dsn: "https://77c3e22c82be474e9ab9aeb1ac6a4494@o4503925390245888.ingest.sentry.io/4503925392277504",
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost:4200", "https://ng-devtools.netlify.app/"],
      routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export class SentryErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    captureException(err.originalError || err);
    // console.error(err);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LabelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler } ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
