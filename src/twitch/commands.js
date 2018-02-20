'use strict';

const andback = (client, { channel }) =>
  client.action(
    channel,
    ` / > toof eno tup neht <<<<<<<<< dna >>>>>>>>>> og neht dna <<<<<<<<< dna >>>>>>>>>> neht dna <<<<<<<<< dna >>>>>>>>>>`
  );

const forward = (client, { channel }) =>
  client.action(
    channel,
    ` / >>>>>>>>>> and <<<<<<<<< and then >>>>>>>>>> and <<<<<<<<< and then go >>>>>>>>>> and <<<<<<<<< then put one foot >`
  );

const fuckedd = (client, { channel }) =>
  client.action(channel, 'https://clips.twitch.tv/SavagePowerfulTaroTF2John');

const punt = (client, { channel, userstate }) => {
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

const yoship = (client, { channel }) =>
  client.action(
    channel,
    `would like you to... Please look forward to it. avalonPLS`
  );

module.exports = {
  andback,
  forward,
  fuckedd,
  punt,
  yoship
};
