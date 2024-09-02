import { Routes } from '@angular/router';
import { ToDoComponent } from './NgRx-Signals-Approach/components/to-do/to-do.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'NgRx-Signals-ToDo',
        pathMatch: 'full'
    },
    {
        path: 'NgRx-Signals-ToDo',
        component: ToDoComponent
    },
];
