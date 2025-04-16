const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }

    if ("root" in node) {
        return prettyPrint(node.root);
    }

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Another BST implemented by hand

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BST {
    root;
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (array.length === 0) return null;
        if (array.length === 1) return new Node(array[0]);

        array = [...new Set(array)].sort((a, b) => a - b);

        const middleIndex = Math.floor(array.length / 2);
        const rootNode = new Node(array[middleIndex]);

        const leftSide = array.slice(0, middleIndex);
        const rightSide = array.slice(middleIndex + 1);

        rootNode.left = this.buildTree(leftSide);
        rootNode.right = this.buildTree(rightSide);

        return rootNode;
    }

    searchIterative(value) {
        const initialTime = performance.now();

        let node = this.root;

        if (node.value === value) return node;

        while (node && node.value !== value) {
            if (node.value > value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        console.log(
            `Busca via árvore (iterativa) - O(log n): ${performance.now() - initialTime
            } ms`
        );

        return node;
    }

    searchRecursive(root, value) {
        const initialTime = performance.now();
        if (root === null) return null;
        if (root.value === value) {
            console.log(
                `Busca via árvore (recursiva) - O(log n): ${performance.now() - initialTime
                } ms`
            );
            return root;
        }

        if (root.value > value) {
            return this.searchRecursive(root.left, value);
        }
        if (root.value < value) {
            return this.searchRecursive(root.right, value);
        }
    }

    insertIterative(value) {
        let node = this.root;
        const newNode = new Node(value);

        while (node !== null) {
            if (node.value > value) {
                if (node.left === null) {
                    node.left = newNode;
                    return;
                }
                node = node.left;
            } else {
                if (node.right === null) {
                    node.right = newNode;
                    return;
                }
                node = node.right;
            }
        }
    }

    insertRecursive(root, value) {
        if (root === null) return null;

        const newNode = new Node(value);

        if (root.value > value) {
            if (!root.left) {
                root.left = newNode;
                return;
            }
            return this.insertRecursive(root.left, value);
        } else {
            if (!root.right) {
                root.right = newNode;
                return;
            }
            return this.insertRecursive(root.right, value);
        }
    }

    deleteIterative(value) {
        let prev = null;
        let curr = this.root;

        while (curr && curr.value !== value) {
            prev = curr;
            if (curr.value > value) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        if (!curr) {
            throw new Error("Node not found for value " + value);
        }

        // Case 1
        if (!curr.left && !curr.right) {
            if (curr === prev.left) {
                prev.left = null;
                return;
            }
            if (curr === prev.right) {
                prev.right = null;
                return;
            }
        }
        // Case 2
        if ((curr.left && !curr.right) || (!curr.left && curr.right)) {
            const childNode = curr.left ? curr.left : curr.right;
            if (prev.left === curr) {
                prev.left = childNode;
            }
            if (prev.right === curr) {
                prev.right = childNode;
            }
            return;
        }

        // Case 3
        let succParent = curr;
        let successor = curr.right;
        while (successor.left) {
            succParent = successor;
            successor = successor.left;
        }
        curr.value = successor.value;

        if (successor.right) {
            succParent.left = successor.right;
        } else {
            prev = curr;
            curr = curr.right;
            while (curr.left) {
                prev = curr;
                curr = curr.left;
            }
            prev.left = null;
            return;
        }
    }

    deleteRecursive(root, value) {
        if (root === null) return null;

        if (root.value > value) {
            root.left = this.deleteRecursive(root.left, value);
            return root;
        }
        if (root.value < value) {
            root.right = this.deleteRecursive(root.right, value);
            return root;
        }
        // root.value equals value. Remove the node

        // Case 1 and 2 - if there are 0 or 1 leaf
        if (root.left && !root.right) {
            root = root.left;
            return;
        }
        if (!root.left && root.right) {
            root = root.right;
        }

        // Case 3 - if there are 2 leaves
        let successor = root.right;

        while (successor.left) {
            successor = successor.left;
        }
        // Replace node to be deleted with its successor
        root.value = successor.value;
        root.right = this.deleteRecursive(root.right, successor.value);
    }

    levelOrderIterative(cb) {
        const queue = [];
        let node = this.root;
        cb(node.value);
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }

        while (queue.length > 0) {
            let curr = queue.shift();
            cb(curr.value);

            if (curr.left) {
                queue.push(curr.left);
            }
            if (curr.right) {
                queue.push(curr.right);
            }
        }
    }
    levelOrderRecursive(cb, root, queueMemory) {
        const queue = queueMemory.length > 0 ? queueMemory : [];

        if (root.left) {
            queue.push(root.left);
        }
        if (root.right) {
            queue.push(root.right);
        }
    }

    preOrderIterative(cb) {
        let root = this.root;
        if (root === null) throw new Error("The tree has no root to iterate over");
        const stack = [root];

        while (stack.length > 0) {
            let curr = stack.pop();
            cb(curr.value);
            if (curr.right) {
                stack.push(curr.right);
            }
            if (curr.left) {
                stack.push(curr.left);
            }
        }
    }

    inOrderIterative(cb) {
        let root = this.root;
        if (root === null) return;

        const stack = [];

        while (root !== null || stack.length > 0) {
            while (root !== null) {
                stack.push(root);
                root = root.left;
            }

            root = stack.pop();
            cb(root.value);
            root = root.right;
        }
    }

    preOrderRecursive(root, cb) {
        if (root === null) return null;

        cb(root.value);
        this.preOrderRecursive(root.left, cb);
        this.preOrderRecursive(root.right, cb)
    }

    inOrderRecursive(root, cb) {
        if (root === null) return null;

        this.inOrderRecursive(root.left, cb);
        cb(root.value);
        this.inOrderRecursive(root.right, cb);
    }

    postOrderRecursive(root, cb) {
        if (root === null) return null;

        this.postOrderRecursive(root.left, cb);
        this.postOrderRecursive(root.right, cb);
        cb(root.value);
    }

    depth(value) {
        // return this._depthRecursive(this.root, value);
        return this._depthIterative(value);
    }

    _depthIterative(value) {
        let counter = 0;
        let root = this.root;

        while (root && root.value !== value) {
            if (root.value > value) {
                root = root.left;
            } else {
                root = root.right;
            }
            counter++;
        }

        if (!root) return null;
        if (root.value === value) return counter;
    }

    _depthRecursive(root, value, counter = 0) {
        if (root === null) return null;
        if (root.value === value) return counter;

        if (root.value > value) {
            return this._depthRecursive(root.left, value, ++counter);
        } else {
            return this._depthRecursive(root.right, value, ++counter);
        }
    }

    height(value) {
        const node = this.searchRecursive(this.root, value);
        return this._heightIterative(node);
    }

    _heightIterative(node) {
        if (node === null) {
            return -1;
        }

        let counter = -1;
        const queue = [node];

        while (queue.length > 0) {
            counter++;
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                // Iterates over all nodes in the queue
                const curr = queue.shift();
                if (curr.left) {
                    queue.push(curr.left);
                }
                if (curr.right) {
                    queue.push(curr.right);
                }
            }
        }
        return counter;
    }

    _heightRecursive(node, counter = 0) {
        if (node === null) {
            return counter - 1;
        }
        counter++;

        const left = this._heightRecursive(node.left, counter);
        const right = this._heightRecursive(node.right, counter);

        return Math.max(left, right);
    }

}

const myArray = [123, 34, 35, 12, 23, 13, 5, 0, -12, -28, -1];
const bst = new BST(myArray);

prettyPrint(bst);

bst.inOrderIterative(console.log)