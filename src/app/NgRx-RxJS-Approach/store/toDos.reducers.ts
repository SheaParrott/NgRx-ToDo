import { createReducer, on } from "@ngrx/store";
import { ToDo } from "../../model/toDo.model";
import { ToDosFilter } from "../../NgRx-Signals-Approach/components/to-do/store/toDos.store";
import { loadToDos, loadToDosFailure, loadToDosSuccess } from "./toDos.action";


export type ToDosState = {
    toDos: ToDo[];
    loading: boolean;
    filter: ToDosFilter;
    error: string;
}

const initialState: ToDosState = {
    toDos: [],
    loading: false,
    filter: "all",
    error: ""
}

export const toDoReducer = createReducer(
    initialState,
    on(loadToDos, (state: ToDosState) => ({...state, loading: true})),
    on(loadToDosSuccess, (state, { toDos }) => ({
        ...state,
        toDos: toDos,
        error: "",
        loading: false
    })),
    on(loadToDosFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    }))
)