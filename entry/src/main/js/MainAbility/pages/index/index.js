export default {
  data() {
    return {
      showAddPanel: false,
      newTask: { title: '', priority: 'medium', dueDate: '', reminderTime: '' },
      tasks: [
        { id: '1', title: 'Örnek Görev', priority: 'medium' }
      ]
    };
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
