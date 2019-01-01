import { assignRole } from '../roles';

export default {
  name: 'assign',
  args: true,
  description: 'Assign a role.',
  aliases: [],
  async execute(_client, message, args) { await assignRole(args, message); }
}
