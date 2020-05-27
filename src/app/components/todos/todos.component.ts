import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoService],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  todo: Todo;
  editTodoString: string;
  title: string;
  date_created: string;
  id: string;
  public addForm: FormGroup;

  constructor(private todoService: TodoService) {
    this.addForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
    });
  }

  deleteTodo(id: any){
    var todos = this.todos;
    this.todoService.deleteTodo(id).subscribe(data => {
      if(data.n == 1){ // if delete operation was successful
        for(var i=0; i<todos.length; i++){
          if(todos[i]._id == id){
            todos.splice(i, 1);
          }
        }
      }
    });
  }

  updateTodo(){
    this.todoService.updateTodo(this.id, this.editTodoString).subscribe(data => {
      if(data.msg != "Todo updated successfully"){ // document updated successfully 
        console.log("Updated Successfully");
      }
    });
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      console.log(this.todos);
    });
    this.clearEditString();
  }

  addTodo(){
    const newTodo = {
      title: this.addForm.value.title,
      date_created: "25/05/2020",
    };
    this.todoService.addTodo(newTodo).subscribe(todo =>{
      this.todos.push(todo);
    });
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  showInEditForm(todo: Todo){
    this.editTodoString = todo.title;
    this.id = todo._id;
  }

  clearEditString(){
    this.editTodoString = "";
    this.id = "";
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

}
