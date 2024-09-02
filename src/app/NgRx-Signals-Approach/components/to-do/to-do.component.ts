import { Component, inject, OnInit } from '@angular/core';
import { ToDosStore } from './store/toDos.store';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon'
import { MatInput, MatSuffix } from '@angular/material/input'
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle'
import { MatListOption, MatSelectionList } from "@angular/material/list"
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [MatFormField, MatLabel, MatIcon, MatInput, MatSuffix, MatButtonToggleGroup, MatButtonToggle, MatSelectionList, MatListOption, MatProgressSpinner, NgStyle],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
  providers: [ToDosStore]
})
export class ToDoComponent implements OnInit{
  store = inject(ToDosStore)

  ngOnInit(): void {
    this.loadToDos().then(() => {
      console.log("to do's loaded")
    })
  }

  async loadToDos(): Promise<void> {
    return await this.store.loadAll()
  }

  async OnAddToDo(title: string): Promise<void> {
    await this.store.addToDO(title)
  }

  async onDeleteToDo(id: string, event: MouseEvent): Promise<void> {
    event.stopPropagation()
    await this.store.deleteToDo(id)
  }

  async OnToDoToggled(id: string, completed: boolean): Promise<void> {
    await this.store.updateToDo(id, !completed)
  }
}
