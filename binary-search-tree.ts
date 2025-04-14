
type Leaf = BSTNode | null;

class BSTNode {
    value: number;
    left: BSTNode;
    right: BSTNode;

    constructor(value: number, left: Leaf = null, right: Leaf = null) {
        this.value = value;
        //@ts-ignore
        this.left = left;
        //@ts-ignore
        this.right = right;
    }
}

class BinaryTree {
    root: BSTNode;

    constructor(root: BSTNode) {
        this.root = root;
    }



    insert(node: BSTNode, value: number): void {
        let temp = node;
        const newNode = new BSTNode(value);

        if (temp.value > value) {
            // Go left
            if (temp.left === null) {
                temp.left = newNode;
                return;
            }
            this.insert(temp.left, value);
        } else {
            if (temp.value === value) {
                let tempRight = temp.right;
                newNode.right = tempRight;
                temp.right = newNode;
                return;
            }

            if (temp.right === null) {
                temp.right = newNode;
                return;
            }

            // new value is greater. Travel right
            this.insert(temp.right, value);
        }
    }
}

const prettyPrint = (node: BSTNode, prefix = "", isLeft = true) => {
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

const bt = new BinaryTree(new BSTNode(50));
bt.insert(bt.root, 40);
bt.insert(bt.root, 30);
bt.insert(bt.root, 60);
bt.insert(bt.root, 70);

prettyPrint(bt.root);