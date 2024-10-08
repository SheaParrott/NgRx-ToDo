import { createReducer, on } from "@ngrx/store";
import { ToDo, ToDosFilter } from "../../model/toDo.model";
import { addToDo, addToDoFailure, addToDoSuccess, deleteToDoFailure, deleteToDoSuccess, filterToDos, loadToDos, loadToDosFailure, loadToDosSuccess, toggleToDoCompletedPropertyFailure, toggleToDoCompletedPropertySuccess } from "./toDos.action";

export type ToDosState = {
    toDos: ToDo[];
    loading: boolean;
    filter: ToDosFilter;
    filteredToDos: ToDo[];
    error: string;
}

const initialState: ToDosState = {
    toDos: [],
    loading: false,
    filter: "all",
    filteredToDos: [],
    error: ""
}

export const toDoReducer = createReducer(
    initialState,
    on(loadToDos, (state: ToDosState) => ({...state, loading: true})),
    on(loadToDosSuccess, (state, { toDos }) => ({
        ...state,
        toDos: toDos,
        filteredToDos: _filterToDos(state.filter, toDos),
        error: "",
        loading: false
    })),
    on(loadToDosFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    })),
    on(addToDoSuccess, (state, { toDo }) => {
        const toDos = [...state.toDos, toDo]

        return {
            ...state,
            toDos,
            filteredToDos: _filterToDos(state.filter, toDos)
        }
    }),
    on(addToDoFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(deleteToDoSuccess, (state, { id }) => {
        const toDos = state.toDos.filter(toDo => toDo.id != id)

        return {
            ...state,
            toDos,
            filteredToDos: _filterToDos(state.filter, toDos)
        }
    }),
    on(deleteToDoFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(toggleToDoCompletedPropertySuccess, (state, { id, completed }) => {
        const toDos = state.toDos.map(toDo => toDo.id == id ? { ...toDo, completed } : toDo)

        return {
            ...state,
            toDos,
            filteredToDos: _filterToDos(state.filter, toDos)
        }
    }),
    on(toggleToDoCompletedPropertyFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(filterToDos, (state, { filter }) => ({
        ...state,
        filter,
        filteredToDos: _filterToDos(filter, state.toDos)
    }))
)

const _filterToDos = (filter: ToDosFilter, toDos: ToDo[]) => {
    switch(filter) {
        case 'all':
            return toDos
        case 'pending':
            return toDos.filter(toDo => !toDo.completed)
        case 'completed':
            return toDos.filter(toDo => toDo.completed)
    }
}