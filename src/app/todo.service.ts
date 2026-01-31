import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  _id: string;   // ✅ MongoDB id
  task: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTask(task: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { task });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, task: string) {
  return this.http.put<Todo>(`${this.apiUrl}/${id}`, { task });
}

}
