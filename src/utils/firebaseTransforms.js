'use strict';

const snapshotToArray = snapshot => {
  const returnedArray = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnedArray.push(item);
  });

  return returnedArray;
};

module.exports.snapshotToArray = snapshotToArray;
