import { Injectable } from "@angular/core";
import { ToDosService } from "../../services/toDos.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadToDos, loadToDosFailure, loadToDosSuccess } from "./toDos.action";
import { catchError, from, map, of, switchMap } from "rxjs";


@Injectable()
export class toDoEffects {
    constructor(
        private toDosService: ToDosService,
        private actions$: Actions
    ) {}

    loadtoDos$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loadToDos),
        switchMap(() =>
            from(this.toDosService.getToDos()).pipe(
                map((toDos) => loadToDosSuccess({ toDos: toDos })),
                catchError((error) => of(loadToDosFailure({ error })))
            )
        )
    ))
}