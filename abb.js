/**
 * Árvores de Busca Binária (ABBs)
 * 
 */

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }

    if ('raiz' in node) {
        return prettyPrint(node.raiz)
    }

    if (node.direita !== null) {
        prettyPrint(node.direita, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.valor}`);
    if (node.esquerda !== null) {
        prettyPrint(node.esquerda, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Node {
    constructor(valor, esquerda = null, direita = null) {
        this.valor = valor;
        this.esquerda = esquerda;
        this.direita = direita;
    }
}

class ABB {
    constructor(array) {
        this.raiz = this.construirArvore(array); 
    }

    construirArvore(array) {
        if (array.length === 0) return null;
        if (array.length === 1) return new Node(array[0]);
        
        const indiceDoMeio = Math.floor(array.length / 2);
        const meio = array[indiceDoMeio];
        const nodeRaiz = new Node(meio);

        const esquerda = array.slice(0, indiceDoMeio);
        const direita = array.slice(indiceDoMeio + 1);

        nodeRaiz.esquerda = this.construirArvore(esquerda);
        nodeRaiz.direita = this.construirArvore(direita);

        return nodeRaiz;
    }
}

const abb = new ABB(arr);

prettyPrint(abb);
