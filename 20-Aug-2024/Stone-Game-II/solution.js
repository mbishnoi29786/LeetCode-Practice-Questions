/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const len = piles.length;
    const dp = new Array(len).fill(null).map(() => new Array(2 * len).fill(null)); 
    const prefixSum = new Array(len + 1).fill(0);

    // Compute the prefix sums for piles
    for (let i = 0; i < len; i++) {
        prefixSum[i + 1] = prefixSum[i] + piles[i];
    }

    // Calculate optimal Stones
    function Calculate(i, M) {
        if (i >= len) return 0;
        if (dp[i][M] !== null) return dp[i][M];

        let maxStones = 0;
        let currentSum = 0;

        for (let X = 1; X <= 2 * M && i + X <= len; X++) {
            currentSum += piles[i + X - 1];
            const remainingStones = prefixSum[len] - prefixSum[i + X] - Calculate(i + X, Math.max(M, X));
            maxStones = Math.max(maxStones, currentSum + remainingStones);
        }
        dp[i][M] = maxStones;
        return maxStones;
    }

    return Calculate(0, 1);
};




/*

*/

// Test cases:
console.log(`Test Case 1: ${stoneGameII([2,7,9,4,4])}`); // Output: Test Case 3: 10
console.log(`Test Case 2: ${stoneGameII([1,2,3,4,5,100])}`); // Output: Test Case 3: 104
console.log(`Test Case 3: ${stoneGameII([1])}`);  // Output: Test Case 3: 1





// Best code done in 51 MS : 

/*
 * @param {number[]} piles
 * @return {number}
 */
/*
let helper = function(piles, dp, suffixSum, i, M) {
    if (i === piles.length) {
        return 0
    }
    if (i + 2*M >= piles.length) {
        return suffixSum[i]
    }
    if (dp[i][M] !== 0) {
        return dp[i][M]
    }
    let res = 0
    for (let x = 1; x<=2*M; ++x) {
        res = Math.max(res, suffixSum[i] - helper(piles, dp, suffixSum, i+x, Math.max(M,x) ))
    }
    return dp[i][M] = res
}
var stoneGameII = function (piles) {
   const n = piles.length;
   if (n<=0) {
       return 0
   }
   const dp = Array.from(Array(n + 1), () => Array(2 * (n + 1)).fill(0));
   let suffixSum =new Array(piles.length)
   suffixSum[suffixSum.length -1] = piles[piles.length - 1]
   for (let i = piles.length - 2; i>=0; --i) {
       suffixSum[i] = piles[i] + suffixSum[i+1]
   }
   return helper(piles, dp, suffixSum, 0, 1)
}

*/