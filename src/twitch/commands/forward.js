export default {
  name: 'forward',
  aliases: [],
  async execute(client, { channel }) {
    client.say(channel, `/me / >>>>>>>>>> and <<<<<<<<< and then >>>>>>>>>> and <<<<<<<<< and then go >>>>>>>>>> and <<<<<<<<< then put one foot >`);
  }
}
