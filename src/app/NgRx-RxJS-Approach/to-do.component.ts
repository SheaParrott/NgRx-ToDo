import { Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon'
import { MatInput, MatSuffix } from '@angular/material/input'
import { MatButtonToggleGroup, MatButtonToggle, MatButtonToggleChange } from '@angular/material/button-toggle'
import { MatListOption, MatSelectionList } from "@angular/material/list"
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { CommonModule, NgStyle } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState, selectFilter, selectFilteredToDos, selectLoading } from './store/toDos.selectors';
import { addToDo, deleteToDo, filterToDos, loadToDos, toggleToDoCompleted } from './store/toDos.action';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ToDo, ToDosFilter } from '../model/toDo.model';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [MatFormField, MatLabel, MatIcon, MatInput, MatSuffix, MatButtonToggleGroup, MatButtonToggle, MatSelectionList, MatListOption, MatProgressSpinner, NgStyle, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
  providers: []
})
export class ToDoComponentTwo implements OnInit, OnDestroy {
  toDos$: Observable<ToDo[]> = this.store.select(selectFilteredToDos)
  filter$: Observable<ToDosFilter> = this.store.select(selectFilter)
  loading$: Observable<boolean> = this.store.select(selectLoading)
  private destroy$ = new Subject<void>();

  filter = viewChild.required(MatButtonToggleGroup)

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadToDos())

    this.filter$
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (this.filter) {
        const filter = this.filter();

        filter.value = value
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  OnAddToDo(title: string): void {
    this.store.dispatch(addToDo({title}))
  }

  onDeleteToDo(id: string, event: MouseEvent): void {
    event.stopPropagation()
    this.store.dispatch(deleteToDo({id}))
  }

  OnToDoToggled(id: string, completed: boolean): void {
    this.store.dispatch(toggleToDoCompleted({ id, completed }))
  }

  onFilterToDos(event: MatButtonToggleChange) {
    const filter: ToDosFilter = event.value

    this.store.dispatch(filterToDos({filter}))
  }
}
