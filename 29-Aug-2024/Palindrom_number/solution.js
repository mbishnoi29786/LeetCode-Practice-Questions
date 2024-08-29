// only beats 33%
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // Negative numbers and numbers ending with 0 (except 0) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let reversed = 0;
    let original = x;

    // to reverse the second half of the number
    while (x > reversed)
    {
        reversed =  reversed * 10 + (x % 10);
        x = Math.floor(x/10);
    }

    // to check if the first half and the reversed second half are the same
    return x === reversed || x === Math.floor(reversed / 10);
};

let number = 121;
console.log(isPalindrome(number));

number = -121;
console.log(isPalindrome(number));

number = 10;
console.log(isPalindrome(number));


// best solution
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) 
{
    if(x<0) return false
    let num=x;
    let reverse=0; // reverse*10 + r

    while(num!=0){
        const reminder= num % 10;
        reverse= reverse*10 + reminder;

        num= parseInt(num/ 10);
    }

    return x==reverse;
};