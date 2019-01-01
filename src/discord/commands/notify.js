import { subscribeToNotifications } from '../roles';

export default {
  name: 'notify',
  description: 'Assigns the @Notifications On role.',
  aliases: [],
  async execute(_client, message) { await subscribeToNotifications(message) }
}
