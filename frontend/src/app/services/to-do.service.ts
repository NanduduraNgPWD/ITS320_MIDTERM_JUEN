import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

type TodoItem = {
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
};

type Todo = {
  _id: string;
  title: string;
  items: TodoItem[];
};

@Injectable({
  providedIn: 'root'
})
export class todoService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/todo';
  Get(): Observable<Todo[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Todo[]>('http://localhost:3000/todo', { headers });
  }


  // Fix the type here
  addTodo(payload: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post('http://localhost:3000/todo/create', payload, { headers });
  }

  updateTodo(id: string, updatedTodo: Todo): Observable<any> {
    return this.http.put(`http://localhost:3000/todo/${id}`, updatedTodo);
  }

  deleteItem(todoId: string, itemIndex: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/todo/${todoId}/item/${itemIndex}`);
  }
  deleteList(listId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/todo/${listId}`);
  }
  getMyTodos(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/my`, { headers });
  }

}
