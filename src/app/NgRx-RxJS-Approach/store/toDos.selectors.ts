import { createSelector } from "@ngrx/store";
import { ToDosState } from "./toDos.reducers";
import { ToDo, ToDosFilter } from "../../model/toDo.model";

export interface AppState {
    toDos: ToDosState
} // given the simplicity of this app I am defining this here rather than at a higher level

export const selectToDos = (state: AppState): ToDosState => state.toDos
export const selectFilteredToDos = createSelector(
    selectToDos,
    (state: ToDosState): ToDo[] => state.filteredToDos
)

export const selectFilter = createSelector(
    selectToDos,
    (state: ToDosState): ToDosFilter => state.filter
)

export const selectLoading = createSelector(
    selectToDos,
    (state: ToDosState): boolean => state.loading
)