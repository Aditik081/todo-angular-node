import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../todo.service';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent implements OnInit {

  task = '';
  taskList: Todo[] = [];
  darkMode = false;

  editingTaskId: string | null = null;
  editTask = '';

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
      this.taskList.push(newTodo);
      this.task = '';
    });
  }

  deleteTask(id: string) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.taskList = this.taskList.filter(t => t._id !== id);
      if (this.editingTaskId === id) this.cancelEdit();
    });
  }

  startEdit(todo: Todo) {
    this.editingTaskId = todo._id;
    this.editTask = todo.task;
  }

  updateTask() {
    if (!this.editingTaskId || !this.editTask.trim()) return;

    this.todoService.updateTask(this.editingTaskId, this.editTask)
      .subscribe(updated => {
        const index = this.taskList.findIndex(t => t._id === updated._id);
        if (index !== -1) this.taskList[index] = updated;
        this.cancelEdit();
      });
  }

  cancelEdit() {
    this.editingTaskId = null;
    this.editTask = '';
  }

  toggleDark() {
    this.darkMode = !this.darkMode;
  }

  trackById(index: number, item: Todo) {
    return item._id;
  }
}
