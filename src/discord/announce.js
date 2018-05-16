'use strict';

const globals = require('../globals');

const sendLiveNotification = client => {
  const channelId = '446152638254284820'; // #live-notifications
  client.channels.get(channelId).send();
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
