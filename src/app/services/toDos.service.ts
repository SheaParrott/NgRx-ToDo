import { Injectable } from "@angular/core";
import { TODOS } from "../model/mock-data";
import { ToDo } from "../model/toDo.model";

@Injectable({
    providedIn: 'root'
})
export class ToDosService {
    // I am simluating API calls here with setTimeout() for simplicity sake

    async getToDos(): Promise<ToDo[]> {
        await this.sleep(1000)
        return TODOS
    }

    async sleep(ms: number): Promise<any> {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        })
    }
}