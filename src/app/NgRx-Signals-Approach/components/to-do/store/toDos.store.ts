import { ToDo } from "../../../../model/toDo.model";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { ToDosService } from "../../../../services/toDos.service";
import { inject } from "@angular/core";


export type ToDosFilter = "all" | "pending" | "completed"

type ToDosState = {
    toDos: ToDo[];
    loading: boolean;
    filter: ToDosFilter;
}

const initialState: ToDosState = {
    toDos: [],
    loading: false,
    filter: "all"
}

export const ToDosStore = signalStore(
    withState(initialState),
    withMethods((store, toDosService: ToDosService = inject(ToDosService)) => ({
        async loadAll() {
            patchState(store, { loading: true })

            const toDos = await toDosService.getToDos()
            patchState(store, { toDos: toDos, loading: false })
        }
    }))
)
