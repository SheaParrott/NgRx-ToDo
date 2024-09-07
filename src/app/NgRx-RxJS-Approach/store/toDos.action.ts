import { createAction, props } from '@ngrx/store';
import { ToDo, ToDosFilter } from '../../model/toDo.model'

export const loadToDos = createAction('[ToDo Page] Load ToDo')

export const loadToDosSuccess = createAction(
    '[ToDo Page] ToDo Load Success',
    props<{ toDos: ToDo[] }>()
)

export const loadToDosFailure = createAction(
    '[ToDo Page] ToDo Load Failure',
    props<{ error: string }>()
)

export const addToDo = createAction(
    "[ToDo Page] Add ToDo",
    props<{ title: string }>()
)

export const addToDoSuccess = createAction(
    "[ToDo Page] Add ToDo Sucess",
    props<{ toDo: ToDo }>()
)

export const addToDoFailure = createAction(
    "[ToDo Page] Add ToDo Failure",
    props<{ error: string }>()
)

export const deleteToDo = createAction(
    "[ToDo Page] Delete ToDo",
    props<{ id: string }>()
)

export const deleteToDoSuccess = createAction(
    "[ToDo Page] Delete ToDo Success",
    props<{ id: string }>()
)

export const deleteToDoFailure = createAction(
    "[ToDo Page] Delete ToDo Failure",
    props<{ error: string }>()
)

export const toggleToDoCompleted = createAction(
    "[ToDo Page] Toggle ToDo completed",
    props<{ id: string, completed: boolean }>()
)

export const filterToDos = createAction(
    "[ToDo Page] Filter ToDos",
    props<{ filter: ToDosFilter }>()
)