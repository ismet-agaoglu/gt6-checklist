export default {
  data() {
    return {
      tasks: [],
      newTask: '',
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
      let response = JSON.parse(xhr.responseText);
      if (response.code === 200) {
        this.tasks = response.data || [];
      }
    };
    xhr.onerror = () => {
      console.error('Load tasks failed');
    };
    xhr.send();
  },

  onNewTaskChange(event) {
    this.newTask = event.value;
  },

  addTask() {
    if (!this.newTask || this.newTask.trim() === '') return;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.apiBase}/tasks`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-user-id', this.userId);
    
    let payload = {
      title: this.newTask,
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0]
    };

    xhr.onload = () => {
      let response = JSON.parse(xhr.responseText);
      if (response.code === 201) {
        this.tasks.push(response.data);
        this.newTask = '';
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
      let response = JSON.parse(xhr.responseText);
      if (response.code === 200) {
        task.completed = newStatus;
        this.$forceUpdate();
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
    };
    xhr.onerror = () => {
      console.error('Delete task failed');
    };
    xhr.send();
  }
};
