'use strict';

const andback = (client, { channel }) =>
  client.action(
    channel,
    ` / > toof eno tup neht <<<<<<<<< dna >>>>>>>>>> og neht dna <<<<<<<<< dna >>>>>>>>>> neht dna <<<<<<<<< dna >>>>>>>>>>`
  );

const defend = (client, { channel }) =>
  client.action(
    channel,
    `avalonDEFEND avalonDEFEND P R O T E C C avalonDEFEND avalonDEFEND`
  );

const forward = (client, { channel }) =>
  client.action(
    channel,
    ` / >>>>>>>>>> and <<<<<<<<< and then >>>>>>>>>> and <<<<<<<<< and then go >>>>>>>>>> and <<<<<<<<< then put one foot >`
  );

const fiesta = (client, { channel }) =>
  client.action(
    channel,
    `avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA avalonFIESTA`
  );

const fuckedd = (client, { channel }) =>
  client.action(channel, 'https://clips.twitch.tv/SavagePowerfulTaroTF2John');

const hype = (client, { channel }) =>
  client.action(
    channel,
    `avalonPOG avalonOMG avalonPOG avalonOMG avalonPOG avalonOMG avalonPOG avalonOMG avalonPOG avalonOMG avalonPOG avalonOMG avalonPOG avalonPOG avalonOMG avalonPOG avalonOMG avalonPOG`
  );

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
      `rekt you, ${username}, for your disrespect, lalafell hater. avalonRAGE`
    );
  }
};

const slap = (client, input, { channel, userstate }) => {
  const username = userstate['display-name'];
  if (input.length > 1) {
    client.action(
      channel,
      `slaps ${username} around a bit with a large trout.`
    );
  } else {
    client.action(
      channel,
      `slaps ${input[0]} around a bit with a large trout.`
    );
  }
};

const subhype = (client, { channel }) =>
  client.action(
    channel,
    `avalonOMG avalonFIESTA avalonHUG avalonPOG avalonOMG avalonFIESTA avalonHUG avalonPOG avalonOMG avalonFIESTA avalonHUG avalonPOG avalonOMG avalonFIESTA avalonHUG avalonPOG`
  );

const yoship = (client, { channel }) =>
  client.action(
    channel,
    `would like you to... Please look forward to it. avalonSMUG`
  );

module.exports = {
  andback,
  defend,
  forward,
  fiesta,
  fuckedd,
  hype,
  punt,
  slap,
  subhype,
  yoship
};
