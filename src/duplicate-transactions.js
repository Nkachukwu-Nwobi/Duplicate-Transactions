function findDuplicatetransactions(transactions) {
  const transactNew1 = transactions.slice(0);

  const transactNew = transactNew1.map((items) => {
    return { ...items };
  });

  // sort the array based on time in order to group easily based on their time differences

  transactNew.sort(function (a, b) {
    return a.time - b.time;
  });

  const duplicates = [];

  let batch = [];

  for (let i = 0; i < transactNew.length - 1; i++) { 


    for (let j = i + 1; j < transactNew.length; j++) {
      const timeDiff = (new Date(transactNew[i].time).getTime - new Date(transactNew[j].time).getTime) / 1000;

      if (batch.length === 0) {
        batch.push(transactNew[i]);
      }

      if (
        transactNew[i].sourceAccount == transactNew[j].sourceAccount &&
        transactNew[i].targetAccount == transactNew[j].targetAccount &&
        transactNew[i].category == transactNew[j].category &&
        transactNew[i].amount == transactNew[j].amount
      ) {
        
        if (timeDiff < 60) {
          batch.push(transactNew[j]);

        // increment i, so when it re-enters the loop, it skips the duplicate at current j
          i ++     
        }
        else {
          //empty batch array to duplicate bucket
          duplicates.push(batch);
          batch = [transactNew[j]]

          // batch.splice(0,batch.length)

        }
      }
    }
  }

  if (batch.length > 1) {
      duplicates.push(batch);
     }

  return duplicates;
}
export default findDuplicatetransactions;
