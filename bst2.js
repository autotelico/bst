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
        let node = this.root;
        
        if (node.value === value) return node;

        while (node && node.value !== value) {
            if (node.value > value) {
                node = node.left;
            } else {
                node = node.right
            }
        }

        return node;
    }

    searchRecursive(root, value) {
        
    }
}

const bst = new BST([123, 34,35, 12, 23 ,13 ,5, 0, -12, -28, -1]);

prettyPrint(bst)

const r = bst.searchIterative(124)

console.log(r);
