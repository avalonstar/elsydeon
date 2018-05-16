'use strict';

const heybryan = (client, { channel }) =>
  client.action(channel, ` ⤇ WHOA BUCKO. avalonBAKA`);

const heyeasy = (client, { channel }) =>
  client.action(channel, ` ⤇ Hey, I got a Thundercloud proc. avalonDERP`);

const heyfires = (client, { channel }) =>
  client.action(channel, ` ⤇ SHIELD OATH DAMNIT. avalonBAKA`);

const heyheather = (client, { channel }) =>
  client.action(channel, ` ⤇ #BlameEos`);

const heykay = (client, { channel }) =>
  client.action(channel, ` ⤇ REMEMBER TO SAAAAAVVVEEEEE~ avalonBLIND`);

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
