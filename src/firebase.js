import admin from 'firebase-admin';
import chalk from 'chalk';

import globals from './globals';
import logger from './logger';

const { FIREBASE_ADMIN_CREDENTIAL, FIREBASE_URI } = process.env;
const serviceAccount = JSON.parse(FIREBASE_ADMIN_CREDENTIAL);

const initializeFirebase = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_URI
  });

  const store = admin.firestore();
  const firestoreSettings = { timestampsInSnapshots: true };
  store.settings(firestoreSettings);

  logger.info(`Firebase is connected to ${chalk.bold(`${FIREBASE_URI}`)}.`);

  globals.store = store;
  return store;
};

export default async () => {
  await initializeFirebase();
};
