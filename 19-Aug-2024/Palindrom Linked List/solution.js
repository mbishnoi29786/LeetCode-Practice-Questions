/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // Edge case: If the list is empty or has one node, it's a palindrome
if (head === null || head.next === null) {
    return true;
}

// Find the middle of the linked list
let slow = head;
let fast = head;
while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
}

// Reverse the second half of the list
let secondHalfHead = reverseList(slow);
let firstHalfHead = head;

// Compare both halves
let secondHalfCurr = secondHalfHead;
while (secondHalfCurr !== null) {
    if (firstHalfHead.val !== secondHalfCurr.val) {
        return false;
    }
    firstHalfHead = firstHalfHead.next;
    secondHalfCurr = secondHalfCurr.next;
}

reverseList(secondHalfHead);

return true;
};
