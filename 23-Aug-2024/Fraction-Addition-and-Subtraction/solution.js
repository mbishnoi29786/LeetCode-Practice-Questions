// solution by me -->
/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function(expression) {
    // Helper function to calculate GCD
    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return Math.abs(a);
    }
    
    // Extracted fractions using regex
    let regex = /([+-]?)(\d+)\/(\d+)/g;
    let match;
    let numerator = 0;
    let denominator = 1;
    
    while ((match = regex.exec(expression)) !== null) {
        let sign = match[1] === '-' ? -1 : 1;
        let num = parseInt(match[2]);
        let denom = parseInt(match[3]);
        
        // Updated total numerator and denominator
        numerator = numerator * denom + sign * num * denominator;
        denominator = denominator * denom;
        
        // Simplified the fraction during each step
        let divisor = gcd(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;
    }
    
    // to ensure denominator is positive
    if (denominator < 0) {
        denominator = -denominator;
        numerator = -numerator;
    }
    
    // to handle case where numerator is zero
    if (numerator === 0) {
        denominator = 1;
    }
    
    return `${numerator}/${denominator}`;
};

console.log(fractionAddition("-1/2+1/2"));
console.log(fractionAddition("-1/2+1/2+1/3"));
console.log(fractionAddition("1/3-1/2"));

// the best i found on leetcode-->
/**
 * @param {string} expression
 * @return {string}
 */
// const gcd = (a, b) => {
//     while(b > 0){
//       const temp = a
//       a = b
//       b = temp % b
//     }
//     return a
//   }
//   const lcm = (a, b) => {
//     return (a*b)/gcd(a,b)
//   }
//   var fractionAddition = function(expression) {
//     if(expression[0] !== "-")expression = "+" + expression
//     const guys = []
//     let i = 0, ans = 0
//     while(i < expression.length){
//       const sign = getSign()
//       const values = getFraction()
//       guys.push([sign * values[0], values[1]])
//     }
//     let denominator = 1
//     for(let i = 0; i < guys.length; i++){
//       denominator = lcm(denominator, guys[i][1])
//     }
//     let numerator = 0
//     for(let i = 0; i < guys.length; i++){
//       numerator += guys[i][0] * (denominator/guys[i][1])
//     }
//     const gceed = gcd(Math.abs(numerator), denominator)
//     return (numerator/gceed) + "/" + (denominator/gceed)
  
//     function getNumber () {
//       let num = 0
//       while(expression[i] >= "0" && expression[i] <= "9")num = num*10 + +expression[i++]
//       return num
//     }
//     function getFraction () {
//       const numerator = getNumber()
//       i++
//       const denominator = getNumber()
//       return [numerator, denominator]
//     }
//     function getSign () {
//       i++
//       if(expression[i-1] === "-"){
//         return -1
//       }else{
//         return 1
//       }
//     }
//   };
