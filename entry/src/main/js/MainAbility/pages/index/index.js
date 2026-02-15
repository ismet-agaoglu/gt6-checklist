export default {
  data() {
    return {
      showAddPanel: false,
      tasks: [
        { id: '1', title: 'Örnek Görev' },
        { id: '2', title: 'İkinci Görev' }
      ]
    };
  },
  toggleAddPanel() { this.showAddPanel = !this.showAddPanel; }
};
