// my solution only beats 35 percent

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    if (!root) return [];
    
    let stack1 = [];
    let stack2 = [];
    let result = [];
    
    stack1.push(root);
    
    while (stack1.length > 0) {
        let node = stack1.pop();
        stack2.push(node);
        
        if (node.left) {
            stack1.push(node.left);
        }
        if (node.right) {
            stack1.push(node.right);
        }
    }
    
    while (stack2.length > 0) {
        result.push(stack2.pop().val);
    }
    
    return result;
};


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}


// Constructed binary tree for [1,null,2,3]
let tree1 = new TreeNode(1);
tree1.right = new TreeNode(2);
tree1.right.left = new TreeNode(3);

console.log(postorderTraversal(tree1));

// Constructed binary tree for []
let tree2 = null;
console.log(postorderTraversal(tree2));

// Constructed binary tree for [1]
let tree3 = new TreeNode(1);
console.log(postorderTraversal(tree3));




// the most optimal solution i found on leetcode:
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var postorderTraversal = function(root) {
    let result = [];
    
    function traverse(node)
    {
        if(node === null)
            return 0;
        
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
    }
    
    traverse(root);
    return result;
};