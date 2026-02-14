import { TaskManager } from '../../utils/TaskManager';

export default {
  data() {
    return {
      tasks: [],
      showAddPanel: false,
      newTask: { title: '', priority: 'medium', dueDate: '', reminderTime: '' },
      userId: 'cmlmdy7xw0000la9lcy1p0pd6',
      apiBase: 'https://inf.alperagayev.com/api',
      taskManager: null
    };
  },
  onInit() {
    this.taskManager = new TaskManager(this.apiBase, this.userId);
    this.loadTasks();
  },
  loadTasks() {
    this.taskManager.load().then(() => {
      this.tasks = this.taskManager.getTasks();
      this.$forceUpdate();
    });
  },
  toggleAddPanel() {
    this.showAddPanel = !this.showAddPanel;
    if (this.showAddPanel) this.resetNewTask();
  },
  resetNewTask() {
    this.newTask = { title: '', priority: 'medium', dueDate: '', reminderTime: '' };
  },
  onTitleChange(e) { this.newTask.title = e.value; },
  onDateChange(e) { this.newTask.dueDate = e.value; },
  onTimeChange(e) { this.newTask.reminderTime = e.value; },
  setPriority(p) { this.newTask.priority = p; },
  addTask() {
    if (!this.newTask.title || this.newTask.title.trim() === '') return;
    this.taskManager.add(this.newTask).then(() => {
      this.tasks = this.taskManager.getTasks();
      this.showAddPanel = false;
      this.resetNewTask();
      this.$forceUpdate();
    });
  },
  toggleTask(id) {
    this.taskManager.toggle(id).then(() => {
      this.tasks = this.taskManager.getTasks();
      this.$forceUpdate();
    });
  },
  deleteTask(id) {
    this.taskManager.delete(id).then(() => {
      this.tasks = this.taskManager.getTasks();
      this.$forceUpdate();
    });
  }
};
