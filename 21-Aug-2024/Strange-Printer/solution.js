// done by me -->

/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(Infinity));

    // single character substrings
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // for substrings of length >= 2 filled the DP table
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            
            // If the entire substring s[i:j+1] is the same character
            if (s[i] === s[j]) {
                dp[i][j] = dp[i][j - 1];
            }
            
            // Checking all possible partitions
            for (let k = i; k < j; k++) {
                dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j]);
            }
        }
    }
    return dp[0][n - 1];
};


// code which beats most (done by somebody else on leetcode) -->
/**
 * @param {string} s
 * @return {number}
 */
// var strangePrinter = function(s) {
//     if (s.length === 0) {
//         return 0;
//     }

//     // Remove consecutive duplicates
//     let filteredChars = [];
//     for (const char of s) {
//         if (filteredChars.length === 0 || char !== filteredChars[filteredChars.length - 1]) {
//             filteredChars.push(char);
//         }
//     }

//     const m = filteredChars.length;
//     const dp = Array.from({ length: m }, () => Array(m).fill(Infinity));
//     const nextOccurrence = Array(m).fill(-1);
    
//     // Fill the DP table with base cases
//     for (let i = 0; i < m; i++) {
//         dp[i][i] = 1;
//     }

//     // Precompute the next occurrence for each character
//     const lastSeen = new Map();
//     for (let i = m - 1; i >= 0; i--) {
//         const char = filteredChars[i];
//         if (lastSeen.has(char)) {
//             nextOccurrence[i] = lastSeen.get(char);
//         }
//         lastSeen.set(char, i);
//     }

//     // Fill the DP table
//     for (let length = 2; length <= m; length++) {
//         for (let start = 0; start <= m - length; start++) {
//             const end = start + length - 1;
//             dp[start][end] = dp[start + 1][end] + 1;
//             let nextPos = nextOccurrence[start];
//             while (nextPos !== -1 && nextPos <= end) {
//                 dp[start][end] = Math.min(dp[start][end], dp[start][nextPos - 1] + (nextPos + 1 <= end ? dp[nextPos + 1][end] : 0));
//                 nextPos = nextOccurrence[nextPos];
//             }
//         }
//     }

//     return dp[0][m - 1];
// };

console.log(strangePrinter('aaabbb'));
console.log(strangePrinter('aba'));
console.log(strangePrinter('abab'));

