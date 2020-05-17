import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {
  @Input() todo:TodoModel;

  @Output() todoDelete = new EventEmitter<TodoModel>();
  @Output() todoUpdate = new EventEmitter<TodoModel>();

  changedText:string ='';
  editing:boolean = false;

  constructor() { }

  ngOnInit() {
  }
  onEdit(){
    this.changedText=this.todo.text;
    this.editing=true;
  }
  onCancel(){
    this.changedText='';
    this.editing=false;
  }
  onDelete(){
    if(confirm('Do you really want to delete?')){
      this.todoDelete.emit(this.todo);
    }
  }
  onStatusChange(event:{target:HTMLInputElement}){
    //const checkbox = event.target.;
    this.todo.pending =  !event.target.checked;
    this.todoUpdate.emit(this.todo);
  }
  onUpdate(){
    // this.todo.text+= Math.random();
    // console.log(this.todo.text);

    this.todo.text = this.changedText;
    this.changedText='';
    this.editing=false;

    this.todoUpdate.emit(this.todo);
  }
  onTextChanging(e){
    const key = e.keyCode || e.which;
    //console.log(key);
    // for(var i in e){
    //   console.log(i,e[i]);
    // }
    switch(key){
      case 13:
        // Enter
        this.onUpdate();  break;
      case 27:
        //Esc   //Keypress doesnot work for Esc key in Chrome (Its a known bug in Chrome)
        this.onCancel();  break;
    }
  }
}
