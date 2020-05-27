import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl: string = "http://localhost:3000/api";
  constructor(private http: Http) { }

  // get todos
  getTodos(){
    return this.http.get(`${this.baseUrl}/todos`)
    .pipe(map(res => res.json()));
  }

  // add todo
  addTodo(newTodo){
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post(`${this.baseUrl}/todo`, newTodo, {headers: headers})
      .pipe(map(res => res.json()));
  }

  // delete todo
  deleteTodo(id){
    return this.http.delete(`${this.baseUrl}/todo/${id}`)
      .pipe(map(res => res.json()));
  }

  //update todo
  updateTodo(id, newTitle:string){
    return this.http.put(`${this.baseUrl}/todo/${id}`, {title: newTitle})
      .pipe(map(res => res.json()));
  }
}
