function classifier(input) {
  const inputDuplicate = input.slice(0);
  const input2 = inputDuplicate.map((item) => {
    return {
      name: item.name,
      age: 2019 - new Date(item.dob).getFullYear(),
      regNo: item.regNo,
      dob: item.dob,
    };
  });
  //Sort the input2 array by ages to efficiently group the objects based on their age differences.
  input2.sort((a, b) => {
    return a.age - b.age;
  });

  //initialize empty arrays for the overall group container and to store the smaller groups

  const groupContainer = [];

  let currentGroup = [];

  for (let i = 0; i < input2.length; i++) {
    const student = input2[i];
    //Add the first student by default (because group length is currently 0) then use the first student to compare age difference with the rest of the students. add any student whose age difference is <= 5
    if (
      currentGroup.length < 3 &&
      (currentGroup.length === 0 || student.age - currentGroup[0].age <= 5)
    ) {
      currentGroup.push(student);
    }
     
    else {
      // add the current group to the group container when the next student fails the previous conditions
      groupContainer.push(currentGroup);

      // reset the current group to the next incoming student in the loop
      currentGroup = [student];
    }
  }

  //Add the last current group after the loop ends to the main group container
  if (currentGroup.length > 0) {
    groupContainer.push(currentGroup);
  }
  
  // initialize a new object to return the final output
  const outputContainer = {};
  //function to return the output values in the expected format

  function printOutput(outputArray) {
    // No of groups
    outputContainer["noOfGroups"] = outputArray.length;

    // Get an array of all members ages in a particular group
    const ageArr = [];
    outputArray.forEach((Arr) => {
      ageArr.push(Arr.map((obj) => obj.age));
      return ageArr;
    });

    // Get an array of the maximum ages of each group
    let maxAge = [];
    for (let a of ageArr) {
      maxAge.push(Math.max(...a));
    }

    // Initialize array to track sum of all ages in the group
    let sumAge = [];

    for (let a of ageArr) {
      sumAge.push(
        a.reduce((accumulator, currentValue) => {
          return Number(accumulator + currentValue);
        }, 0)
      );
    }
    // Get array of reg nos in each group
    const regNoArr = [];
    outputArray.forEach((Arr) => {
      regNoArr.push(Arr.map((obj) => Number(obj.regNo)));
      return regNoArr;
    });

    //Loop through output argument and generate format empty output container

    for (let i = 0; i < outputArray.length; i++) {
      outputContainer["group" + (i + 1)] = {
        members: outputArray[i],
        oldest: maxAge[i],
        sum: sumAge[i],
        regNos: regNoArr[i].sort((a, b) => a - b),
      };
    }
  }
  //call function and feed in groupContainer as argument

  printOutput(groupContainer);

  // return final output
  return outputContainer;
}

export default classifier;
