// Solution 1

/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    const binary = num.toString(2);
    let complement = '';
    for (let i = 0; i < binary.length; i++) {
        complement += binary[i] === '0' ? '1' : '0' ;
    }
    return parseInt(complement, 2);
};

console.log(findComplement(5));
console.log(findComplement(1));


// soilution 2 
/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    // bit mask with all bits set to 1 for the length of the binary representation of `num`
    const mask = (1 << num.toString(2).length) - 1;
    // XOR `num` with the mask to get the complement
    return num ^ mask;
};

// Test the function
console.log(findComplement(5)); // Output: 2
console.log(findComplement(1)); // Output: 0


// most optimal and easiest i found on leetcode
const findComplement1 = (num) => {
    num = num.toString(2).split("");
    
    for(let i = 0; i < num.length;i++){
        num[i] = num[i] === "1" ? "0" : "1"
    }
    return parseInt(num.join(""), 2)
}

// Test the function
console.log(findComplement1(5)); // Output: 2
console.log(findComplement1(1)); // Output: 0