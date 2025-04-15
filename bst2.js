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
}

const myArray = [123, 34, 35, 12, 23, 13, 5, 0, -12, -28, -1];
const bst = new BST(myArray);

bst.insertIterative(2)
bst.insertRecursive(bst.root, 14)

prettyPrint(bst)