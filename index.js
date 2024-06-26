import Node from './nodeClass.js';
import buildTree from './buildTree.js';
import mergeSort from './mergeSort.js';
import prettyPrint from './prettyprint.js';
import numberArray from './randomNumbers.js';

class Tree {
  constructor(sortedArray) {
    this.root = buildTree(
      mergeSort(removeDuplicates(sortedArray)),
      0,
      removeDuplicates(sortedArray).length - 1
    );
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

  //Doesnt actually work due to callback(queue.shift())
  //being called despite there being no items in the queue and thus providing the callback with an undefined item
  levelOrder(
    callback = () => {
      return null;
    },
    node = this.root
  ) {
    let queue = [node];
    let treeArray = [];

    //while has item
    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (currentNode !== null) {
        treeArray.push(currentNode.data);
        callback(currentNode.data);

        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
    }
    return callback() === null ? treeArray : undefined;
  }

  inOrder(callback = null, node = this.root, array = []) {
    if (node === null) return;
    this.inOrder(callback, node.left, array);

    array.push(node.data);
    if (callback) callback(node.data);

    this.inOrder(callback, node.right, array);

    if (callback === null) return array;
  }

  preOrder(callback = null, node = this.root, array = []) {
    if (node === null) return;

    array.push(node.data);
    if (callback) callback(node.data);

    this.preOrder(callback, node.left, array);
    this.preOrder(callback, node.right, array);

    if (callback === null) return array;
  }

  postOrder(callback = null, node = this.root, array = []) {
    if (node === null) return;

    this.postOrder(callback, node.left, array);
    this.postOrder(callback, node.right, array);

    array.push(node.data);
    if (callback) callback(node.data);

    if (callback === null) return array;
  }

  height(node = this.root, count = -1) {
    if (!node) return count;

    const left = this.height(node.left, count + 1);
    const right = this.height(node.right, count + 1);

    return right > left ? right : left;
  }

  depth(target, node = this.root, count = 0) {
    if (!node) return -1;

    if (node === target) return count;

    const leftDepth = this.depth(target, node.left, count + 1);
    if (leftDepth !== -1) return leftDepth;

    const rightDepth = this.depth(target, node.right, count + 1);
    if (rightDepth !== -1) return rightDepth;

    return -1;
  }

  isBalanced(node = this.root) {
    if (!node) return true; // An empty tree is balanced

    const leftDepth = Math.abs(this.depth(node.left));
    const rightDepth = Math.abs(this.depth(node.right));

    if (
      Math.abs(leftDepth - rightDepth) <= 3 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    const treeInArray = this.inOrder();
    console.log(treeInArray);
    const newTree = buildTree(
      mergeSort(removeDuplicates(treeInArray)),
      0,
      removeDuplicates(treeInArray).length - 1
    );

    this.root = newTree;
  }
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

//Tests
// const sortedArray = numberArray();
// const bst = new Tree(sortedArray);
// prettyPrint(bst.root);
// console.log(bst.isBalanced());
// console.log(bst.levelOrder(), bst.preOrder(), bst.inOrder(), bst.postOrder());
// for (const item of numberArray(10)) {
//   bst.insertNode(item);
// }
// prettyPrint(bst.root);
// console.log(bst.isBalanced());
// bst.rebalance();
// prettyPrint(bst.root);
// console.log(bst.isBalanced());
// console.log(bst.levelOrder(), bst.preOrder(), bst.inOrder(), bst.postOrder());
