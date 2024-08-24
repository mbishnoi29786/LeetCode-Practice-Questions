// done by me 

/**
 * @param {string} n
 * @return {string}
 */
var nearestPalindromic = function(n) {
    const len = n.length;
    const candidates = new Set();

    // Helper function to create a palindrome from a prefix
    function createPalindrome(prefix, isOdd) {
        let palin = prefix;
        if (isOdd) {
            palin += palin.slice(0, -1).split('').reverse().join('');
        } else {
            palin += palin.split('').reverse().join('');
        }
        return BigInt(palin);
    }

    // converted input string to BigInt for comparison
    const nBigInt = BigInt(n);

    // generated candidate palindromes
    const prefix = n.slice(0, Math.ceil(len / 2));
    const prefixNum = BigInt(prefix);

    for (let i = -1; i <= 1; i++) {
        const newPrefix = (prefixNum + BigInt(i)).toString();
        const isOdd = len % 2 === 1;
        const palin = createPalindrome(newPrefix, isOdd);
        if (palin !== nBigInt) {
            candidates.add(palin);
        }
    }

    // to handle special cases like when 10 is given it should give 9 insted of 11
    if (n.length > 1) {
        candidates.add(BigInt('9'.repeat(n.length - 1)));
    }

    // to handle palindromes like "1001" when the number is "999"
    candidates.add(BigInt('1' + '0'.repeat(n.length - 1) + '1'));

    //where the length of palindrome is one more than the input length
    candidates.add(BigInt('1' + '0'.repeat(len - 1) + '1'));

    // to find the closest palindrome
    let minDiff = Infinity;
    let result = BigInt(0);

    for (const palin of candidates) {
        const diff = BigInt(Math.abs(Number(palin - nBigInt)));
        if (diff < minDiff || (diff === minDiff && palin < result)) {
            minDiff = diff;
            result = palin;
        }
    }

    return result.toString();
};

console.log(nearestPalindromic("123"));  // 121
console.log(nearestPalindromic("1"));    // 0
console.log(nearestPalindromic("10"));   // 9
console.log(nearestPalindromic("1001")); //
console.log(nearestPalindromic("807045053224792883")); // 807045053350540708



// solution i found on leetcode as most efficient
/**
 * function nearestPalindromic(n) {
    const length = n.length;

    // Edge cases
    const edgeCaseLow = String(Math.pow(10, length - 1) - 1);  // e.g., "9999" for "10000"
    const edgeCaseHigh = String(Math.pow(10, length) + 1);     // e.g., "100001" for "99999"

    // Calculate prefix and generate main palindrome by mirroring
    const prefix = n.slice(0, Math.ceil(length / 2));
    
    const mainPalindrome = mirror(prefix, length);
    const smallerPalindrome = mirror(String(parseInt(prefix) - 1), length);
    const largerPalindrome = mirror(String(parseInt(prefix) + 1), length);

    // Store candidates and remove self from the list
    let candidates = [mainPalindrome, smallerPalindrome, largerPalindrome, edgeCaseLow, edgeCaseHigh];
    candidates = candidates.filter(candidate => candidate !== n);

    // Find the closest palindrome
    let closest = null;
    let minDiff = Number.MAX_SAFE_INTEGER;
    
    for (let candidate of candidates) {
        let diff = Math.abs(parseInt(candidate) - parseInt(n));
        if (diff < minDiff || (diff === minDiff && parseInt(candidate) < parseInt(closest))) {
            minDiff = diff;
            closest = candidate;
        }
    }

    return closest;
}
 */