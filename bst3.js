import { prettyPrint } from "./utils.js";

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor(arr) {
        this.root = this._buildTree(arr);
    }

    _buildTree(array) {
        if (array.length === 0) return null;
        if (array.length === 1) return new Node(array[0]);

        array = [...new Set(array)].sort((a, b) => a - b);

        const middleIndex = Math.floor(array.length / 2);
        const middle = array[middleIndex];
        const rootNode = new Node(middle);

        const left = array.slice(0, middleIndex);
        const right = array.slice(middleIndex + 1);

        rootNode.left = this._buildTree(left);
        rootNode.right = this._buildTree(right);
        return rootNode;
    }
}


const bst = new BST([123, 12, 31, 45, 36546, 46, 2, 12, 3, 12, 325, 345])

prettyPrint(bst);