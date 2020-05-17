import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css']
})
export class TodoEntryComponent implements OnInit {

  @ViewChild('todoInput', { static: true }) todoInput: ElementRef;

  @Output() todoCreated = new EventEmitter<TodoModel>();

  todoText: string;

  constructor() { }

  ngOnInit() {
  }

  // generateTodoEvent(text: string) {
  //   const todo = new TodoModel(text, true, new Date());
  //   console.log('emit',todo.text);
  //   this.todoCreated.emit(todo);
  // }
  generateTodoEvent() {
    if (this.todoText) {
      const todo = new TodoModel(this.todoText, true, new Date());
      this.todoCreated.emit(todo);
      this.todoText = '';
    }
  }

  onTodoinputKeypress(e: any) {
    const key = e.keyCode || e.which;
    if (key === 13) {
      //Enter key
      // const todoText = this.todoInput.nativeElement.value;
      // if (todoText) {
      //   this.generateTodoEvent(todoText);
      // }
      this.generateTodoEvent();
    }
  }
  onTodoCreate(e: any) {
    // const todoText = this.todoInput.nativeElement.value;
    //   if (todoText) {
    //     this.generateTodoEvent(todoText);
    //   }
    this.generateTodoEvent();
  }
}
