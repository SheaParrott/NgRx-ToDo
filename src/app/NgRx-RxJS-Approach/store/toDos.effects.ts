import { Injectable } from "@angular/core";
import { ToDosService } from "../../services/toDos.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addToDo, addToDoFailure, addToDoSuccess, loadToDos, loadToDosFailure, loadToDosSuccess } from "./toDos.action";
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

    addToDo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addToDo),
            switchMap(({ title }) =>
                from(this.toDosService.addToDo({ title })).pipe(
                    map((toDo) => addToDoSuccess({ toDo })),
                    catchError((error) => of(addToDoFailure({ error })))
                )
            )
        ))
}