import Node from './nodeClass.js';
import mergeSort from './mergeSort.js';
import prettyPrint from './prettyprint.js';

class Tree {
  constructor(sortedArray) {
    this.root = buildTree(sortedArray, 0, sortedArray.length);
  }

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(value) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}

function buildTree(arr, start, end) {
  //Base Case
  if (start > end) {
    return null;
  }

  //Find middle & set subtree Root
  var mid = Math.floor((start + end) / 2);
  var node = new Node(arr[mid]);

  //Recursively call on each Subtree
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

const exampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArray = mergeSort(removeDuplicates(exampleArray));

const bst = new Tree(sortedArray);
prettyPrint(bst.root);
