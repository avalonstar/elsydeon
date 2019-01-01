import { unassignRole } from '../roles';

export default {
  name: 'unassign',
  args: true,
  description: 'Unassign a role.',
  aliases: [],
  async execute(_client, message, args) { await unassignRole(args, message); }
}
