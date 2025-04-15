const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }

    if ('root' in node) {
        return prettyPrint(node.root)
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
        if (array.length === 1) return new Node(array[0])

        array = [...new Set(array)].sort((a, b) => a - b);

        const middleIndex = Math.floor(array.length / 2);
        const rootNode = new Node(array[middleIndex]);

        const leftSide = array.slice(0, middleIndex);
        const rightSide = array.slice(middleIndex + 1);

        rootNode.left = this.buildTree(leftSide)
        rootNode.right = this.buildTree(rightSide);

        return rootNode;
    }

    searchIterative(value) {
        const initialTime = performance.now()

        let node = this.root;

        if (node.value === value) return node;

        while (node && node.value !== value) {
            if (node.value > value) {
                node = node.left;
            } else {
                node = node.right
            }
        }
        console.log(`Busca via árvore (iterativa) - O(log n): ${performance.now() - initialTime} ms`);

        return node;
    }

    searchRecursive(root, value) {
        const initialTime = performance.now()
        if (root === null) return null
        if (root.value === value) {
            console.log(`Busca via árvore (recursiva) - O(log n): ${performance.now() - initialTime} ms`)
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
                node = node.left
            } else {
                if (node.right === null) {
                    node.right = newNode;
                    return;
                }
                node = node.right

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
            return this.insertRecursive(root.left, value)
        } else {
            if (!root.right) {
                root.right = newNode;
                return;
            }
            return this.insertRecursive(root.right, value);
        }
    }

    #handleDeleteIterative(parent, node) {
        if (!node.right) return node.left
        if (!node.left) return node.right;

        let curr = node;
        let prev = parent;

        prev = curr;
        curr = curr.right;

        while (curr.left) {
            prev = curr;
            curr = curr.left;
        }
        node.value = curr.value;
        prev.left = null
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
        if (curr.left && !curr.right || !curr.left && curr.right) {
            const childNode = curr.left ? curr.left : curr.right;
            if (prev.left === curr) {
                prev.left = childNode;
            }
            if (prev.right === curr) {
                prev.right = childNode;
            }

        }
        
        // Case 3
        let successor = curr.right;
        while (successor.left) {
            successor = successor.left;
        }
        curr.value = successor.value;
        
        prev = curr
        curr = curr.right;
        while (curr.left) {
            prev = curr;
            curr = curr.left;
        }
        prev.left = null;
    }

    deleteRecursive(root, value) {
        if (root === null) return null

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
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Case 3 - if there are 2 leaves
        let successor = root.right;

        while (successor.left) {
            successor = successor.left;
        }
        // Replace node to be deleted with its successor
        root.value = successor.value;
        root.right = this.deleteRecursive(root.right, successor.value);

        return root;
    }

    levelOrderIterative(cb) {
        const queue = [];
        let node = this.root;
        cb(node.value)
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
}

const myArray = [123, 34, 35, 12, 23, 13, 5, 0, -12, -28, -1];
const bst = new BST(myArray);

bst.insertIterative(2)
bst.insertRecursive(bst.root, 14)
// bst.deleteRecursive(bst.root, 0)
// bst.deleteIterative(12)

prettyPrint(bst)

bst.levelOrderIterative(console.log)