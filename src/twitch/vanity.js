'use strict';

const heybryan = (client, { channel }) =>
  client.action(
    channel,
    ` ⤇ THIS HAND OF MINE GLOWS WITH AN AWESOME POWER. IT'S BURNING GRIP TELLS ME TO DEFEAT YOU. TAKE THIS. MY LOVE. MY ANGER. AND ALL OF MY SORROW. SHININGGGGGGGG FINGGEERRRR!~ avalonRAGE`
  );

const heyeasy = (client, { channel }) =>
  client.action(channel, ` ⤇ Hey, I got a Thundercloud proc. avalonDERP`);

const heyfires = (client, { channel }) =>
  client.action(channel, ` ⤇ SHIELD OATH DAMNIT. avalonDEFEND`);

const heyheather = (client, { channel }) =>
  client.action(channel, ` ⤇ #BlameEos`);

const heykay = (client, { channel }) =>
  client.action(channel, ` ⤇ REMEMBER TO SAAAAAVVVEEEEE~ avalonRAGE`);

const provoke = (client, { channel }) =>
  client.action(
    channel,
    ` ⤇ "BRYAN YOU PROVOKED IT NOOOOOOOOOOO" ~ @Dmal_ , 2017`
  );

module.exports = {
  heybryan,
  heyeasy,
  heyfires,
  heyheather,
  heykay,
  provoke
};
