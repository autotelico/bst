// Iterative approach
function fibIter(n) {
    const arr = [];

    while (n >= 2) {
        arr.unshift(fibRec(n));
        n--;
    }
    return arr
}

// Recursive approach
function fib(n, arr = []) {
    if (n < 2) return arr;

    const value = fibRec(n);
    arr.unshift(value);
    return fib(n - 1, arr);
}


// Helper function for fib(n)
function fibRec(n) {
    if (n < 2) {
        return n;
    }

    return fibRec(n - 1) + fibRec(n - 2)
}

console.log(fibRec(8))