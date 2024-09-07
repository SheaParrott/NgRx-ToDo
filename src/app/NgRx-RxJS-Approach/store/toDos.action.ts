import { createAction, props } from '@ngrx/store';
import { ToDo } from '../../model/toDo.model'

export const loadToDos = createAction('[ToDo Page] Load ToDo')

export const loadToDosSuccess = createAction(
    '[ToDo Page] ToDo Load Success',
    props<{ toDos: ToDo[] }>()
)

export const loadToDosFailure = createAction(
    '[ToDo Page] ToDo Load Failure',
    props<{ error: string }>()
)