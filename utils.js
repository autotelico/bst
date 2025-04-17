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

module.exports = prettyPrint;