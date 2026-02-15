import fetch from '@system.fetch';

export default {
  data() {
    return {
      showAddPanel: false,
      tasks: [],
      apiStatus: 'API: bekleniyor',
      userId: 'cmlmdy7xw0000la9lcy1p0pd6',
      apiBase: 'http://inf.alperagayev.com/api'
    };
  },
  onInit() { this.loadTasks(); },
  loadTasks() {
    let timedOut = false;
    setTimeout(() => {
      if (this.apiStatus === 'API: bekleniyor') {
        this.apiStatus = 'API: TIMEOUT';
        this.$forceUpdate();
      }
    }, 6000);

    fetch.fetch({
      url: `${this.apiBase}/tasks`,
      method: 'GET',
      header: { 'x-user-id': this.userId },
      success: (res) => {
        if (timedOut) return;
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
        if (timedOut) return;
        this.apiStatus = 'API: FAIL';
      }
    });
  },
  toggleAddPanel() { this.showAddPanel = !this.showAddPanel; }
};
