function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  function merge(left, right) {
    const result = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    // Concatenate any remaining elements (one of these will be empty)
    return result.concat(left, right);
  }

  return merge(left, right);
}

export default mergeSort;
