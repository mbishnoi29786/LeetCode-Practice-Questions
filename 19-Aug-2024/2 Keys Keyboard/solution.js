/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function(n) {
    if (n === 1) return 0;
    let minOperations = n; // maximum possible operations

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            // i is a divisor, so n / i is also a divisor
            minOperations = Math.min(minOperations, i + minSteps(n / i));
            if (i !== n / i) { // to Avoid double counting when i == n / i
                minOperations = Math.min(minOperations, n / i + minSteps(i));
            }
        }
    }
    
    return minOperations;
};

console.log(minSteps(10));