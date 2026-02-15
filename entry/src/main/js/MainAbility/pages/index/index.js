import fetch from '@system.fetch';

export default {
  data() {
    return {
      showAddPanel: false,
      tasks: [],
      apiStatus: 'API: bekleniyor',
      userId: 'cmlmdy7xw0000la9lcy1p0pd6',
      apiBase: 'https://inf.alperagayev.com/api'
    };
  },
  onInit() { this.loadTasks(); },
  loadTasks() {
    fetch.fetch({
      url: `${this.apiBase}/tasks`,
      method: 'GET',
      header: { 'x-user-id': this.userId },
      success: (res) => {
        try {
          let data = res.data;
          if (typeof data === 'string') data = JSON.parse(data);
          if (Array.isArray(data)) this.tasks = data;
          else if (data && data.code === 200) this.tasks = data.data || [];
          this.apiStatus = 'API: OK';
          this.$forceUpdate();
        } catch (e) {
          this.apiStatus = 'API: PARSE ERR';
        }
      },
      fail: (err) => {
        this.apiStatus = 'API: FAIL';
      }
    });
  },
  toggleAddPanel() { this.showAddPanel = !this.showAddPanel; }
};
