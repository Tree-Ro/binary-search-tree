import Node from './nodeClass.js';
import mergeSort from './mergeSort.js';
import prettyPrint from './prettyprint.js';

class Tree {
  constructor(sortedArray) {
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  insertNode(value, node = this.root) {
    if (node.data === value || value === '') {
      return null;
    }

    if (node.data > value) {
      if (node.left === null) {
        node.left = new Node(value);
        return node.left;
      } else {
        return this.insertNode(value, node.left); // Continue down the left subtree
      }
    } else {
      if (node.right === null) {
        node.right = new Node(value);
        return node.right;
      } else {
        return this.insertNode(value, node.right); // Continue down the right subtree
      }
    }
  }

  deleteNode(value, node = this.root, parentNode = null) {
    if (!node) {
      return false; // Node with the given value not found
    }

    if (node.data === value) {
      if (!node.left && !node.right) {
        //Case 1: No children
        parentNode.left === node
          ? (parentNode.left = null)
          : (parentNode.right = null);
      } else if (!node.left || !node.right) {
        //Case 2: One child
        const child = node.left ? node.left : node.right;
        parentNode.left === node
          ? (parentNode.left = child)
          : (parentNode.right = child);
      } else if (node.left && node.right) {
        //Case 3: Two children
        let temp = node.right;
        let tempParent = node;
        while (temp.left) {
          tempParent = temp;
          temp = temp.left;
        }
        node.data = temp.data;
        this.deleteNode(temp.data, temp, tempParent);
      }

      return true; //Returns undefined in Case1 & Case2 ?????
    }

    if (node.data > value) {
      this.deleteNode(value, node.left, node);
    } else if (node.data < value) {
      this.deleteNode(value, node.right, node);
    }
  }

  find(value, node = this.root) {
    while (node !== null && node.data !== value) {
      if (node.data > value) {
        node = node.left;
      } else if (node.data < value) {
        node = node.right;
      }
    }

    const result = node ? node : null;

    return result;
  }

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

const exampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6250, 324];
const sortedArray = mergeSort(removeDuplicates(exampleArray));

const bst = new Tree(sortedArray);

bst.insertNode(7000);
bst.insertNode(6500);
console.log(bst.deleteNode(8));
console.log(bst.deleteNode(6500));
prettyPrint(bst.root);
