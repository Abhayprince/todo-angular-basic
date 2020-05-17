import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  //@Input() todoList: TodoModel[] = [];


  private _todoList: TodoModel[]=[];

  @Input() set todoList(value: TodoModel[]) {
     this._todoList = value;
     console.log('SETTER - ',this._todoList.length);
     this.computeCounts();

  }
  get todoList(): TodoModel[] {
      return this._todoList;
  }


  allCount = 0;
  doneCount = 0;
  pendingCount = 0;
  doneTodoList: TodoModel[] = [];
  pendingTodoList: TodoModel[] = [];
  constructor() {   
    
  }
  computeCounts() {
    this.allCount = this.todoList.length;

    this.doneTodoList = this.todoList.filter(t => !t.pending);
    this.pendingTodoList = this.todoList.filter(t => t.pending);

    this.doneCount = this.doneTodoList.length;
    this.pendingCount = this.pendingTodoList.length;
  }

  ngOnInit() {
    //console.log('NG-INIT - this.todoList.length',this.todoList.length);
    //this.computeCounts();
  }
  

  getIndex(todo: TodoModel) {
    return this.todoList.findIndex(t => t.id === todo.id);
  }
  onTodoDeleteRequest(todo: TodoModel) {
    const index = this.getIndex(todo);
    if (index > -1) {
      this.todoList.splice(index, 1);
      localStorage['todo'] = JSON.stringify(this.todoList);
      this.computeCounts();
    }
  }
  onTodoUpdate(updatedTodo: TodoModel) {
    const index = this.getIndex(updatedTodo);
    if (index > -1) {
      this.todoList[index] = updatedTodo;
      localStorage['todo'] = JSON.stringify(this.todoList);
      this.computeCounts();
    }
  }
}
