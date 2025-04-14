
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

    search(node: BSTNode, value: number): any {
        if (node === null) {
            console.log("Value not found");
            return null;
        }

        let tmp = node;

        if (tmp.value === value) {
            console.log(tmp);
            return tmp;
        }

        if (value < tmp.value) {
            return this.search(tmp.left, value);
        } else {
            return this.search(tmp.right, value);
        }
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

    remove(node: BSTNode, value: number): any {
        if (node === null) return null;
        
        let tmp = node;

        if (tmp.left.value === value) {
            if (tmp.left.left) {
                let tmpLeftRight = tmp.left.right;
                tmp.left = tmp.left.left;
                tmp.left.right = tmpLeftRight;
            } 
            if (tmp.left.right) {
                let tmpLeftLeft = tmp.left.left;
                tmp.left = tmp.left.right;
                tmp.left.left = tmpLeftLeft;
            }
            return;
        }

        if (tmp.right.value === value) {
            if (tmp.right.left) {
                let tmpRightRight = tmp.right.right;
                tmp.right = tmp.right.left;
                tmp.right.right = tmpRightRight;
            } 
            if (tmp.left.right) {
                let tmpRightLeft = tmp.right.left;
                tmp.right = tmp.right.right;
                tmp.right.left = tmpRightLeft;
            }
            return;
        }

        if (value < tmp.value) {
            return this.remove(tmp.left, value);
        } else {
            return this.remove(tmp.right, value);
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
bt.insert(bt.root, 59);
bt.insert(bt.root, 70);
bt.insert(bt.root, 41);


//const r = bt.search(bt.root, 40);
bt.remove(bt.root, 30)
prettyPrint(bt.root);