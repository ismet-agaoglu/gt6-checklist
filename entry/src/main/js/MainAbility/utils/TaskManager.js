import { NotificationService } from './NotificationService';

export class TaskManager {
  constructor(apiBase, userId) {
    this.apiBase = apiBase;
    this.userId = userId;
    this.tasks = [];
  }

  load() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.apiBase}/tasks`);
      xhr.setRequestHeader('x-user-id', this.userId);
      xhr.onload = () => {
        try {
          let response = JSON.parse(xhr.responseText);
          if (response.code === 200 || Array.isArray(response)) {
            this.tasks = Array.isArray(response) ? response : (response.data || []);
            this.checkOverdue();
            resolve(this.tasks);
          }
        } catch (e) {
          reject(e);
        }
      };
      xhr.onerror = reject;
      xhr.send();
    });
  }

  add(taskData) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.apiBase}/tasks`);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('x-user-id', this.userId);
      
      xhr.onload = () => {
        try {
          let response = JSON.parse(xhr.responseText);
          let newTask = response.data || response;
          newTask.isOverdue = false;
          this.tasks.push(newTask);
          NotificationService.notifyTaskAdded(newTask.title);
          resolve(newTask);
        } catch (e) {
          reject(e);
        }
      };
      xhr.onerror = reject;
      xhr.send(JSON.stringify(taskData));
    });
  }

  toggle(taskId) {
    return new Promise((resolve, reject) => {
      let task = this.tasks.find(t => t.id === taskId);
      if (!task) reject(new Error('Task not found'));

      let newStatus = !task.completed;
      let xhr = new XMLHttpRequest();
      xhr.open('PATCH', `${this.apiBase}/tasks/${taskId}`);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('x-user-id', this.userId);

      xhr.onload = () => {
        try {
          let response = JSON.parse(xhr.responseText);
          task.completed = newStatus;
          task.isOverdue = false;
          if (newStatus) {
            NotificationService.notifyTaskCompleted(task.title);
          }
          resolve(task);
        } catch (e) {
          reject(e);
        }
      };
      xhr.onerror = reject;
      xhr.send(JSON.stringify({ completed: newStatus }));
    });
  }

  delete(taskId) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE', `${this.apiBase}/tasks/${taskId}`);
      xhr.setRequestHeader('x-user-id', this.userId);

      xhr.onload = () => {
        try {
          this.tasks = this.tasks.filter(t => t.id !== taskId);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
      xhr.onerror = reject;
      xhr.send();
    });
  }

  checkOverdue() {
    let now = new Date();
    for (let task of this.tasks) {
      if (task.dueDate && !task.completed) {
        let dueDate = new Date(task.dueDate);
        task.isOverdue = dueDate < now;
        if (task.isOverdue) {
          NotificationService.notifyOverdue(task.title);
        }
      } else {
        task.isOverdue = false;
      }
    }
  }

  getTasks() {
    return this.tasks;
  }

  getTaskById(taskId) {
    return this.tasks.find(t => t.id === taskId);
  }

  getOverdueTasks() {
    return this.tasks.filter(t => t.isOverdue);
  }

  getTasksByPriority(priority) {
    return this.tasks.filter(t => t.priority === priority);
  }
}
