const prettyPrint = require("./utils");

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

    _findNode(value, root) {
        if (root === null) return null;
        if (root.value === value) return root;

        if (root.value < value) {
            return this._findNode(value, root.right);
        }
        if (root.value > value) {
            return this._findNode(value, root.left);
        }
    }

    searchRec(value) {
        if (!value) {
            throw new Error("You must pass a node value to be searched");
        }
        const root = this.root;

        return this._findNode(value, root);
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

    insert(value) {
        const root = this.root;
        this._insertRec(value, root);
    }

    _insertRec(value, root) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        if (root === null) {
            return;
        }

        const newNode = new Node(value);

        if (root.value > value) {
            if (!root.left) {
                root.left = newNode;
                return;
            }
            return this._insertRec(value, root.left);
        } else {
            if (!root.right) {
                root.right = newNode;
                return;
            }
            return this._insertRec(value, root.right);
        }
    }

    _insertIter(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        let root = this.root;
        let prev = null;

        if (root === null) {
            root = newNode;
            return;
        }

        while (root !== null) {
            prev = root;
            if (root.value > value) {
                root = root.left;
            } else {
                root = root.right;
            }
        }

        if (prev.value > value) {
            prev.left = newNode;
        } else {
            prev.right = newNode;
        }
    }

    deleteRec(value, root) {
        if (root === null) return null;
        if (root.value > value) {
            root.left = this.deleteRec(value, root.left);
            return root;
        }
        if (root.value < value) {
            root.right = this.deleteRec(value, root.right);
            return root;
        }
        console.log(root);

        // Value equals root value. Treat deletion cases

        // Case 1 and 2 - root has no leaves or 1 leaf
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        /**
         *              (2)
         *             /  \
         *           (0)  (3)
         *               / \
         *           (2.5) (4)
         */

        // Case 3 - root has both leaves
        let successorsParent = root;
        let successor = root.right;
        while (successor.left) {
            successorsParent = successor;
            successor = successor.left;
        }
        root.value = successor.value;
        successorsParent.left = successor.right;
    }

    deleteRec2(value, node) {
        if (node === null) return null;
        if (node.value > value) {
            node.left = this.deleteRec2(value, node.left);
            return node;
        }
        if (node.value < value) {
            node.right = this.deleteRec2(value, node.right);
            return node;
        }

        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let successor = node.right;

        while (successor.left) {
            successor = successor.left;
        }
        node.value = successor.value;
        node.right = this.deleteRec2(successor.value, node.right);
        return node;
    }

    deleteRec3(value, node) {
        if (node === null) return null;
        if (node.value > value) {
            node.left = this.deleteRec3(value, node.left);
            return node;
        }
        if (node.value < value) {
            node.right = this.deleteRec3(value, node.right);
            return node;
        }

        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let successor = node.right;
        while (successor.left) {
            successor = successor.left;
        }
        node.value = successor.value;
        node.right = this.deleteRec3(successor.value, node.right);
        return node;
    }

    depthIter(value) {
        let node = this.root;
        let counter = 0;

        while (node !== null && node.value !== value) {
            counter++;
            if (node.value > value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        if (!node) return null;
        return counter;
    }

    depthRec(value, node, counter = -1) {
        if (node === null) return null;
        if (node.value === value) return ++counter;

        if (node.value > value) {
            return this.depthRec(value, node.left, ++counter);
        } else {
            return this.depthRec(value, node.right, ++counter);
        }
    }

    heightIter(value) {
        let node = this.root;
        let height = -1;

        while (node !== null && node.value !== value) {
            if (node.value < value) {
                node = node.right;
            } else {
                node = node.left;
            }
        }

        if (node === null) return null;

        // Got to the node. Now check the depth
        const queue = [node];

        while (queue.length > 0) {
            height++;
            
            let levelSize = queue.length;

            for (let i = 0; i < levelSize; i++) {
                let curr = queue.shift();
                if (curr.left) {
                    queue.push(curr.left);
                }
                if (curr.right) {
                    queue.push(curr.right);
                }
            }
        }

        return height;
    }

    _getNodeHeight(node) {
        if (node === null) return -1;

        const left = this._getNodeHeight(node.left);
        const right = this._getNodeHeight(node.right);

        return 1 + Math.max(left, right);
    }

    heightRec(value) {
        const node = this.searchIter(value);
        if (node === null) {
            return -1;
        }

        const left = this._getNodeHeight(node.left);
        const right = this._getNodeHeight(node.right);

        return 1 + Math.max(left, right);
    }
}

const bst = new BST([123, 12, 31, 45, 36546, 46, 2, 12, 3, 12, 325, 345]);
const bst2 = new BST([]);

// bst2.insert(1);
// bst2.insert(2);
// bst2.insert(0);
// prettyPrint(bst2);

// console.log(bst.depthRec(12, bst.root));
// console.log(bst.searchRec(123));

prettyPrint(bst);

console.log(bst.heightIter(46));
