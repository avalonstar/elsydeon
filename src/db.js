'use strict';

const admin = require('firebase-admin');
const chalk = require('chalk');
const logger = require('winston');

const globals = require('./globals');

const { FIREBASE_ADMIN_CREDENTIAL, FIREBASE_URI } = process.env;
const serviceAccount = JSON.parse(FIREBASE_ADMIN_CREDENTIAL);

const initializeFirebase = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_URI
  });

  const db = admin.database();
  const snapshot = await db.ref().once('value');
  if (snapshot.exists()) {
    logger.info(`Firebase is connected to ${chalk.bold(`${FIREBASE_URI}`)}.`);
  }

  globals.db = db;
  return db;
};

module.exports = async () => {
  await initializeFirebase();
};
