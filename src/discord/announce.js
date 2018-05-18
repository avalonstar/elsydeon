'use strict';

const _ = require('lodash');
const moment = require('moment');

const globals = require('../globals');

const channelId = '446152638254284820'; // #live-notifications
const roleId = '446513618666651658';
const emoteIDs = [
  939481,
  939478,
  939480,
  939484,
  939452,
  939485,
  939453,
  939454,
  939457,
  939460,
  939461,
  939466,
  939471,
  939486,
  939472,
  939449,
  939474,
  939488,
  939489
];

const sendLiveNotification = client => {
  const content = `Calling all Crusasders (<@&${roleId}>) ⤇ https://twitch.tv/avalonstar/`;
  const embed = {
    color: 4886754,
    title: `[ A☆ / ${moment().format('MMMM Do, YYYY')} ] Go Live Notification`,
    description: `We're live! Join us for today's cast... whatever it happens to be.`,
    url: `https://twitch.tv/avalonstar`,
    timestamp: moment().toISOString(),
    thumbnail: {
      url: `https://static-cdn.jtvnw.net/emoticons/v1/${_.sample(emoteIDs)}/2.0`
    },
    image: {
      url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_avalonstar-1600x900.jpg`
    },
    footer: {
      icon_url: `https://static-cdn.jtvnw.net/jtv_user_pictures/99294aa4-3212-46ca-90b1-e2baaf6c18f9-profile_image-70x70.png`,
      text: `Don't worry, you haven't missed a thing. :3`
    }
  };
  client.channels.get(channelId).send({ content, embed });
};

const subscribeToNotifications = message => {
  if (message.member.roles.has(roleId)) {
    message.reply(
      `you're already receiving notifications, silly. Stop confusing me. <:avalonBAN:239949776249028609>`
    );
  } else {
    message.member.addRole(roleId).catch(console.error);
    message
      .reply(
        `thank you! You'll be pinged from <#446152638254284820> every time the channel goes live. <:avalonHAPPY:400012759150100482>`
      )
      .catch(console.error);
  }
};

const unsubscribeFromNotifications = message => {
  if (message.member.roles.has(roleId)) {
    message.member.removeRole(roleId).catch(console.error);
    message
      .reply(
        `sorry for bothering you. You will no longer receive go-live notifications. <:avalonFEELS:404711501929119757>`
      )
      .catch(console.error);
  } else {
    message.reply(
      `you didn't even want to be notified in the first place. Why you gotta be like that? <:dittySAD:281983387395293185>`
    );
  }
};

const dbListener = async client => {
  const { db } = globals;
  db.ref(`avalonstar/uxc`).on('child_changed', snapshot => {
    if (snapshot.exists()) {
      sendLiveNotification(client);
    }
  });
};

module.exports = async client => {
  await dbListener(client);
};

module.exports.subscribeToNotifications = subscribeToNotifications;
module.exports.unsubscribeFromNotifications = unsubscribeFromNotifications;
