export default {
  data() {
    return {
      showAddPanel: false,
      newTask: { title: '', priority: 'medium', dueDate: '', reminderTime: '' },
      tasks: [ { id: '1', title: 'Örnek Görev', priority: 'medium' } ],
      userId: 'cmlmdy7xw0000la9lcy1p0pd6',
      apiBase: 'https://inf.alperagayev.com/api'
    };
  },
  onInit() {
    this.safeLoadTasks();
  },
  safeLoadTasks() {
    try {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.apiBase}/tasks`);
      xhr.setRequestHeader('x-user-id', this.userId);
      xhr.onload = () => {
        try {
          let response = JSON.parse(xhr.responseText);
          if (Array.isArray(response)) {
            this.tasks = response;
          } else if (response.code === 200) {
            this.tasks = response.data || [];
          }
          this.$forceUpdate();
        } catch (e) {
          console.error('Parse error', e);
        }
      };
      xhr.onerror = () => { console.error('API error'); };
      xhr.send();
    } catch (e) {
      console.error('XHR error', e);
    }
  },
  toggleAddPanel() { this.showAddPanel = !this.showAddPanel; },
  onTitleChange(e) { this.newTask.title = e.value; },
  onDateChange(e) { this.newTask.dueDate = e.value; },
  onTimeChange(e) { this.newTask.reminderTime = e.value; },
  setPriority(p) { this.newTask.priority = p; },
  addTask() {},
  toggleTask() {},
  deleteTask() {}
};
