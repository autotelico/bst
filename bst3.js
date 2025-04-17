const prettyPrint = require('./utils')

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

    searchRec(value, root) {
        if (root === null) return null;
        if (root.value === value) return root;

        if (root.value > value) {
            return this.searchRec(value, root.left);
        }

        if (root.value < value) {
            return this.searchRec(value, root.right);
        }

    }

    searchIter(value) {
        let node = this.root;
        if (node === null) return null;

        while (node && node.value !== value) {
            if (node.value > value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return node;
    }

    insertRec(value, root) {
        if (root === null) return;
        const newNode = new Node(value);

        if (root.value > value) {
            if (!root.left) {
                root.left = newNode;
                return;
            }
            return this.insertRec(value, root.left);
        } else {
            if (!root.right) {
                root.right = newNode;
                return
            }
            return this.insertRec(value, root.right);
        }
    }
}


const bst = new BST([123, 12, 31, 45, 36546, 46, 2, 12, 3, 12, 325, 345])
bst.insertRec(1, bst.root)

console.log(bst.searchIter(1))

prettyPrint(bst);