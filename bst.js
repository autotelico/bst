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
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const bt = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(bt.root)