import { TaskManager } from '../../utils/TaskManager';

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
      apiBase: 'https://inf.alperagayev.com/api',
      taskManager: null
    };
  },

  onInit() {
    this.taskManager = new TaskManager(this.apiBase, this.userId);
    this.loadTasks();
  },

  loadTasks() {
    this.taskManager.load()
      .then(() => {
        this.tasks = this.taskManager.getTasks();
        this.$forceUpdate();
      })
      .catch(err => {
        console.error('Load tasks error:', err);
      });
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

    this.taskManager.add(this.newTask)
      .then(() => {
        this.tasks = this.taskManager.getTasks();
        this.showAddPanel = false;
        this.resetNewTask();
        this.$forceUpdate();
      })
      .catch(err => {
        console.error('Add task error:', err);
      });
  },

  toggleTask(taskId) {
    this.taskManager.toggle(taskId)
      .then(() => {
        this.tasks = this.taskManager.getTasks();
        this.$forceUpdate();
      })
      .catch(err => {
        console.error('Toggle task error:', err);
      });
  },

  deleteTask(taskId) {
    this.taskManager.delete(taskId)
      .then(() => {
        this.tasks = this.taskManager.getTasks();
        this.$forceUpdate();
      })
      .catch(err => {
        console.error('Delete task error:', err);
      });
  }
};
