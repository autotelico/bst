class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (array.length === 0) return null;
        if (array.length === 1) return new Node(array[0]);

        const preparedArray = [...new Set(array)].sort((a, b) => a < b ? -1 : 1);
        console.log(`preparedArray: ${preparedArray}`);

        const rootNodeIndex = Math.floor(preparedArray.length / 2);
        const rootNode = new Node(preparedArray[rootNodeIndex]);

        const left = preparedArray.slice(0, rootNodeIndex);
        const right = preparedArray.slice(rootNodeIndex + 1);

        rootNode.left = this.buildTree(left)
        rootNode.right = this.buildTree(right)

        return rootNode;
    }

    insert(value) {
        const newNode = new Node(value);
        let tmp = this.root;

        while (tmp !== null) {
            if (tmp.value > value) {
                // Go left
                if (tmp.left === null) {
                    tmp.left = newNode;
                    return;
                }
                tmp = tmp.left;
            } else {
                // Go right
                if (tmp.right === null) {
                    tmp.right = newNode;
                    return;
                }
                tmp = tmp.right;
            }
        }


    }

    delete(root, value) {
        if (root === null) return null;

        if (value < root.value) {
            // Go left
            root.left = this.delete(root.left, value);
            return root;
        }
        if (value > root.value) {
            root.right = this.delete(root.right, value);
            return root;
        }

        // Cases 1 & 2 - Node has 0 leaves or 1 leaf
        if (!root.left) {
            console.log(`Root ${root.value} is returning the right value`, root.right);
            return root.right;
        }
        if (!root.right) {
            console.log(`Root ${root.value} is returning the left value! Which is `, root.left);
            return root.left;
        }

        // Case 3 - Node has both leaves
        // Find successor
        let succ = root.right;
        while (succ.left) {
            succ = succ.left;
        }
        root.value = succ.value;

        root.right = this.delete(root.right, succ.value);

        return root;
    }
}

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

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

bst.insert(6346)
bst.delete(bst.root, 8)

prettyPrint(bst)