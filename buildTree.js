import Node from './nodeClass.js';

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

export default buildTree;
