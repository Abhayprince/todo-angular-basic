import { Component } from '@angular/core';
import { TodoModel } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  newProp='new Prop';
  todoList: TodoModel[]=[];
  constructor(){
    const fromStorage = localStorage['todo'];
    if(fromStorage){
      this.todoList = JSON.parse(fromStorage) || [];
    }
    console.log('app.compnent',this.todoList.length);
  }


  onTodoCreated(todo: TodoModel){
    console.log('listener',todo);
    this.todoList.push(todo);
    
    //Need to do it to Forcefuly trigger ng Change detection in other components referencing this.todoList
    this.todoList=[...this.todoList];
    
    localStorage['todo'] = JSON.stringify(this.todoList);
    console.log('app.compnent Created',this.todoList.length);
  }
}
