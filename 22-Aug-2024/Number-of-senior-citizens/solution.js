// solution by me

/**
 * @param {string[]} details
 * @return {number}
 */
var countSeniors = function(details) {
    let numberOfCitizensAbove60 = 0;
    for (let i = 0; i < details.length; i++)
    {
        const age = parseInt(details[i].substring(11,13), 10);
        if (age > 60)
        {
            numberOfCitizensAbove60++;
        }
    }
    return numberOfCitizensAbove60;
};

console.log(countSeniors(["7868190130M7522","5303914400F9211","9273338290F4010"])); // Output: 2
console.log(countSeniors(["1313579440F2036","2921522980M5644"])); // Output: 0

// the best solution i found on leetcode
/** 
* @param {string[]} details
* @return {number}
*/
var countSeniors = function(details) {
   return details.filter(str=> {
       let age = parseInt(str.substring(11,13));
       return age >60;
   }).length;
};