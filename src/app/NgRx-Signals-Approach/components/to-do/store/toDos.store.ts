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
        },
        async addToDO(title: string) {
            const toDo = await toDosService.addToDo({ title, completed: false})

            patchState(store, (state) => ({
                toDos: [...state.toDos, toDo]
            }))
        },
        async deleteToDo(id: string) {
            await toDosService.deleteToDo(id)

            patchState(store, (state) => ({
                toDos: state.toDos.filter(toDo => toDo.id !== id)
            }))
        },
        async updateToDo(id: string, completed: boolean) {
            await toDosService.updateToDo(id, completed)

            patchState(store, (state) => ({
                toDos: state.toDos.map(toDo => toDo.id == id ? { ...toDo, completed: completed } : toDo)
            }))
        }
    }))
)
