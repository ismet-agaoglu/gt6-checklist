export default {
  data() {
    return {
      tasks: [],
      showAddPanel: false,
      newTask: {
        title: '',
        priority: 'medium',
        dueDate: '',
        reminderTime: ''
      },
      userId: 'cmlmdy7xw0000la9lcy1p0pd6',
      apiBase: 'https://inf.alperagayev.com/api'
    };
  },

  onInit() {
    this.loadTasks();
  },

  loadTasks() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.apiBase}/tasks`);
    xhr.setRequestHeader('x-user-id', this.userId);
    xhr.onload = () => {
      try {
        let response = JSON.parse(xhr.responseText);
        if (response.code === 200) {
          this.tasks = response.data || [];
          this.checkOverdue();
        }
      } catch (e) {
        console.error('Parse error:', e);
      }
    };
    xhr.onerror = () => {
      console.error('Load tasks failed');
    };
    xhr.send();
  },

  checkOverdue() {
    let now = new Date();
    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      if (task.dueDate && !task.completed) {
        let dueDate = new Date(task.dueDate);
        task.isOverdue = dueDate < now;
      } else {
        task.isOverdue = false;
      }
    }
  },

  toggleAddPanel() {
    this.showAddPanel = !this.showAddPanel;
    if (this.showAddPanel) {
      this.resetNewTask();
    }
  },

  resetNewTask() {
    this.newTask = {
      title: '',
      priority: 'medium',
      dueDate: '',
      reminderTime: ''
    };
  },

  onTitleChange(event) {
    this.newTask.title = event.value;
  },

  onDateChange(event) {
    this.newTask.dueDate = event.value;
  },

  onTimeChange(event) {
    this.newTask.reminderTime = event.value;
  },

  setPriority(priority) {
    this.newTask.priority = priority;
  },

  addTask() {
    if (!this.newTask.title || this.newTask.title.trim() === '') {
      return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.apiBase}/tasks`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-user-id', this.userId);
    
    let payload = {
      title: this.newTask.title,
      priority: this.newTask.priority,
      dueDate: this.newTask.dueDate || null,
      reminderTime: this.newTask.reminderTime || null
    };

    xhr.onload = () => {
      try {
        let response = JSON.parse(xhr.responseText);
        if (response.code === 201) {
          response.data.isOverdue = false;
          this.tasks.push(response.data);
          this.showAddPanel = false;
          this.resetNewTask();
        }
      } catch (e) {
        console.error('Parse error:', e);
      }
    };
    xhr.onerror = () => {
      console.error('Add task failed');
    };
    xhr.send(JSON.stringify(payload));
  },

  toggleTask(taskId) {
    let task = null;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === taskId) {
        task = this.tasks[i];
        break;
      }
    }
    if (!task) return;

    let newStatus = !task.completed;
    let xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${this.apiBase}/tasks/${taskId}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-user-id', this.userId);

    let payload = { completed: newStatus };

    xhr.onload = () => {
      try {
        let response = JSON.parse(xhr.responseText);
        if (response.code === 200) {
          task.completed = newStatus;
          task.isOverdue = false;
          this.$forceUpdate();
        }
      } catch (e) {
        console.error('Parse error:', e);
      }
    };
    xhr.onerror = () => {
      console.error('Toggle task failed');
    };
    xhr.send(JSON.stringify(payload));
  },

  deleteTask(taskId) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${this.apiBase}/tasks/${taskId}`);
    xhr.setRequestHeader('x-user-id', this.userId);

    xhr.onload = () => {
      try {
        let response = JSON.parse(xhr.responseText);
        if (response.code === 200) {
          let filtered = [];
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id !== taskId) {
              filtered.push(this.tasks[i]);
            }
          }
          this.tasks = filtered;
        }
      } catch (e) {
        console.error('Parse error:', e);
      }
    };
    xhr.onerror = () => {
      console.error('Delete task failed');
    };
    xhr.send();
  }
};
