import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { toDoReducer } from './NgRx-RxJS-Approach/store/toDos.reducers';
import { toDoEffects } from './NgRx-RxJS-Approach/store/toDos.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideStore({ toDos: toDoReducer }), provideEffects([toDoEffects])]
};
