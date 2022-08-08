import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { AsyncStackTaggingZoneSpec } from './zone-async-stack-tagging';

if (environment.production) {
  enableProdMode();
}

Zone.current.fork(new AsyncStackTaggingZoneSpec()).run(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
