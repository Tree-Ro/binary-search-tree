function createRandomNumberArray(n = 15) {
  let array = [];
  while (array.length < n) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

export default createRandomNumberArray;
