import { unsubscribeFromNotifications } from '../roles';

export default {
  name: 'unnotify',
  description: 'Unassigns the @Notifications On role.',
  aliases: [],
  async execute(_client, message) {
    await unsubscribeFromNotifications(message);
  },
};
