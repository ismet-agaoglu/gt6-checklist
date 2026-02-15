import fetch from '@system.fetch';

export default {
  data() {
    return {
      tasks: [],
      apiStatus: 'API: bekleniyor',
      netStatus: 'NET: bekleniyor',
      userId: 'cmlmdy7xw0000la9lcy1p0pd6',
      apiBase: 'http://inf.alperagayev.com/api'
    };
  },
  onInit() {
    this.testNet();
    this.loadTasks();
  },
  testNet() {
    fetch.fetch({
      url: 'http://example.com',
      method: 'GET',
      success: () => { this.netStatus = 'NET: OK'; this.$forceUpdate(); },
      fail: () => { this.netStatus = 'NET: FAIL'; this.$forceUpdate(); }
    });
  },
  loadTasks() {
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
      fail: () => {
        this.apiStatus = 'API: FAIL';
      }
    });
  }
};
