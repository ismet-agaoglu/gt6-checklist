export class NotificationService {
  static sendNotification(title, message, taskId) {
    try {
      let request = {
        id: parseInt(taskId.substring(0, 8), 16) % 10000,
        content: {
          contentType: 0,
          normal: {
            title: title,
            text: message
          }
        }
      };

      console.log('Notification sent:', request);
    } catch (error) {
      console.error('Notification error:', error);
    }
  }

  static notifyTaskAdded(taskTitle) {
    this.sendNotification('✅ Yeni Görev', taskTitle, 'new-task');
  }

  static notifyTaskCompleted(taskTitle) {
    this.sendNotification('🎉 Görev Tamamlandı', taskTitle, 'completed');
  }

  static notifyReminder(taskTitle, dueDate) {
    let message = `Hatırlatma: ${dueDate}`;
    this.sendNotification('⏰ Hatırlatma', message, 'reminder');
  }

  static notifyOverdue(taskTitle) {
    this.sendNotification('⚠️ Gecikmiş Görev', taskTitle, 'overdue');
  }
}
