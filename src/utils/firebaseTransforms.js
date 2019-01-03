const snapshotToArray = snapshot => {
  const returnedArray = [];

  snapshot.forEach(doc => {
    const item = doc.data();
    returnedArray.push(item);
  });

  return returnedArray;
};

module.exports.snapshotToArray = snapshotToArray;
