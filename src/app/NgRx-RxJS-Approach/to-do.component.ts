import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
// import { ToDosFilter, ToDosStore } from './store/toDos.store';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon'
import { MatInput, MatSuffix } from '@angular/material/input'
import { MatButtonToggleGroup, MatButtonToggle, MatButtonToggleChange } from '@angular/material/button-toggle'
import { MatListOption, MatSelectionList } from "@angular/material/list"
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { CommonModule, NgStyle } from '@angular/common';
import { Observable } from 'rxjs';
import { ToDo } from '../model/toDo.model';
import { provideStore, Store } from '@ngrx/store';
import { toDoReducer } from './store/toDos.reducers';
import { AppState, selectAllToDos } from './store/toDos.selectors';
import { loadToDos } from './store/toDos.action';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [MatFormField, MatLabel, MatIcon, MatInput, MatSuffix, MatButtonToggleGroup, MatButtonToggle, MatSelectionList, MatListOption, MatProgressSpinner, NgStyle, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
  providers: []
})
export class ToDoComponentTwo implements OnInit{
  toDos$ = this.store.select(selectAllToDos)// @shea - need selector here


  // store = inject(ToDosStore)
  // filter = viewChild.required(MatButtonToggleGroup)

  constructor(private store: Store<AppState>) {
    // effect(() => {
    //   const filter = this.filter();

    //   filter.value = this.store.filter()
    // })
  }

  ngOnInit(): void {
    this.store.dispatch(loadToDos())
    // this.loadToDos().then(() => {
    //   console.log("to do's loaded")
    // })
  }

  async loadToDos(): Promise<void> {
    // return await this.store.loadAll()
  }

  async OnAddToDo(title: string): Promise<void> {
    // await this.store.addToDO(title)
  }

  async onDeleteToDo(id: string, event: MouseEvent): Promise<void> {
    // event.stopPropagation()
    // await this.store.deleteToDo(id)
  }

  async OnToDoToggled(id: string, completed: boolean): Promise<void> {
    // await this.store.updateToDo(id, !completed)
  }

  onFilterToDos(event: MatButtonToggleChange) {
    // const filter: ToDosFilter = event.value

    // this.store.updateFilter(filter)
  }
}
