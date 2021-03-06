import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { WebsocketService } from '../websocket.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoList;


  constructor(private http : HttpClient,private webSocketService:WebsocketService) { }

  ngOnInit(): void {
    this.getTodo();

    this.webSocketService.listen('add').subscribe(
      (data)=>
      {
        console.log(data);
       this.getTodo();
      }
    )
    this.webSocketService.listen('del').subscribe(
      (data)=>
      {
        console.log(data);
       this.getTodo();
      }
    )

  }
  getTodo()
  {
    this.http.get('https://utsavtododemo.herokuapp.com/todo').subscribe((todos)=>{
      this.toDoList =todos;
    });
  }

  delete(todo) {

    var todoid = todo._id;
    this.http.delete('https://utsavtododemo.herokuapp.com/tododelete/'+todoid).subscribe(
      data=>{
        console.log("data1");
        console.log(data)
      },
      error=>{
        console.log("errrrrrrrr1")
        console.log(error);
      }
    );
  }


  addTodo(value)
  {

    this.http.post('https://utsavtododemo.herokuapp.com/todo',{description:value},{
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).subscribe(
      data=>{
        console.log("data2");
        console.log(data)
      },
      error=>{
        console.log("errrrrrrrr2")
        console.log(error);
      }
    );
  }
}
