// my solution 

/**
 * Definition for a _Node.
 * function _Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * }
 */

// Definition for a _Node.
function _Node(val, children) {
    this.val = val;
    this.children = children || [];
}

// function to convert array to N-ary Tree
function arrayToNaryTree(arr) {
    if (arr.length === 0) return null;

    const root = new _Node(arr[0], []);
    const queue = [root];
    let index = 1;

    while (index < arr.length) {
        const node = queue.shift();

        // to check if the node has children to process
        if (node) {
            console.log(`Processing node with value: ${node.val}`);
        } else {
            console.log('Node is undefined');
            continue;
        }

        // process children
        while (index < arr.length && arr[index] !== null) {
            const child = new _Node(arr[index], []);
            node.children.push(child);
            queue.push(child);
            index++;
            console.log(`Added child with value: ${child.val} to node with value: ${node.val}`);
        }

        // Skip over nulls
        while (index < arr.length && arr[index] === null) {
            index++;
        }
    }

    return root;
}

// Postorder traversal function
var postorder = function(root) {
    if (root === null) return [];

    let result = [];

    function traverse(node) {
        if (node) {
            for (let child of node.children) {
                traverse(child);
            }
            result.push(node.val);
        }
    }

    traverse(root);

    return result;
};

// Test cases
console.log(postorder(arrayToNaryTree([1, null, 3, 2, 4, null, 5, 6]))); 

console.log(postorder(arrayToNaryTree([1, null, 2, 3, 4, 5, null, null, 6, 7, null, 8, null, 9, 10, null, null, 11, null, 12, null, 13, null, null, 14])));

