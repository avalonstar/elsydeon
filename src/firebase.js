import admin from 'firebase-admin';
import chalk from 'chalk';
import redis from 'redis';

import globals from './globals';
import logger from './logger';
import { snapshotToArray } from './utils/firebaseTransforms';

const { FIREBASE_ADMIN_CREDENTIAL, FIREBASE_URI, REDIS_URL } = process.env;
const serviceAccount = JSON.parse(FIREBASE_ADMIN_CREDENTIAL);
const client = redis.createClient(REDIS_URL);

const initializeFirebase = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_URI
  });

  const store = admin.firestore();
  const firestoreSettings = { timestampsInSnapshots: true };
  store.settings(firestoreSettings);

  logger.info(`Firebase is connected to ${chalk.bold(`${FIREBASE_URI}`)}.`);

  const snapshot = await store.collection('quotes').get();
  client.set('quotes', JSON.stringify(snapshotToArray(snapshot)));

  globals.store = store;
  return store;
};

export default async () => {
  await initializeFirebase();
};
