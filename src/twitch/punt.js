'use strict';

const handleInput = (client, { channel, userstate, message }) => {
  const username = userstate['display-name'];
  if (userstate.mod === true || channel === `#${userstate.username}`) {
    client.action(
      channel,
      `can't punt ${username}, they're too kawaii~ avalonEYES`
    );
  } else {
    client.timeout(channel, userstate.username, 1, 'Asked to be punted');
    client.action(
      channel,
      `rekt you, ${username}, for your disrespect, lalafell hater. avalonBAKA`
    );
  }
};

module.exports.handleInput = handleInput;
