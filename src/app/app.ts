import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  task = '';
  taskList: Todo[] = [];
  darkMode = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe(data => {
      this.taskList = data;
    });
  }

  addTask() {
    if (!this.task.trim()) return;

    this.todoService.addTask(this.task).subscribe(newTodo => {
      this.taskList.push(newTodo); // instant UI update
      this.task = '';
    });
  }

  deleteTask(id: string) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.taskList = this.taskList.filter(t => t._id !== id);
    });
  }

  toggleDark() {
    this.darkMode = !this.darkMode;
  }

  trackById(index: number, item: Todo) {
    return item._id;
  }
}
