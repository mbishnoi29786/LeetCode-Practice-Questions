// my solution beats 67.95
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) 
{
    // the value mapping for Roman numerals
    const values = 
    {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let total = 0;
    let prevValue = 0;

    // to iterate over each character in the string
    for (let i = s.length - 1; i >= 0; i--) 
    {
        const char = s[i];
        const value = values[char];

        // to determine if we need to add or subtract the value
        if (value < prevValue) 
        {
            total -= value;
        } 
        else 
        {
            total += value;
        }

        // then update prevValue for the next iteration
        prevValue = value;
    }

    return total;
};

console.log(romanToInt("III"));
console.log(romanToInt("LVIII"));
console.log(romanToInt("MCMXCIV"));

// best solution
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const romanNumerals= {
        I:1,
        V:5,
        X:10,
        L:50,
        C:100,
        D:500,
        M:1000
    }

    let total=0;
    let index=0
    while (index < s.length){
        if (romanNumerals[s[index]] < romanNumerals[s[index+ 1]]){
                total += romanNumerals[s[index+ 1]] - romanNumerals[s[index]];
                index += 2;
        }else{
            total += romanNumerals[s[index]]
            index++; 
        }
    }
    return total;
};
