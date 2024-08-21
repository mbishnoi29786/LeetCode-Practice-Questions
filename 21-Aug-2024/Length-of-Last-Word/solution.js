/**
 * @param {string} s
 * @return {number}
 */

// done by me -->
// one way -->
// var lengthOfLastWord = function(s) {
//     let arr = s.split(' ').filter(Boolean);
//     console.log(arr);
//     let lastWordLength = arr[(arr.length) -1].length;
//     return lastWordLength;
// };

// optimal way
var lengthOfLastWord = function(s) {
    let length = 0;
    let inWord = false;
    
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ' ') {
            if (inWord) {
                break;  // We've reached the end of the last word
            }
        } else {
            inWord = true;
            length++;
        }
    }
    
    return length;
};

// solution i found on which beats most
/**
 * @param {string} s
 * @return {number}
 */
// var lengthOfLastWord = function(s) {
//     const splited = s.split(" ");
//     for(let i = splited.length-1;i=>0;i--){
//         if(splited[i].length>0){
//             return splited[i].length
//         }
//     }
// };

console.log(lengthOfLastWord('Hello    World    '));
console.log(lengthOfLastWord('luffy is still joyboy'));
console.log(lengthOfLastWord('   fly me   to   the moon  '));
