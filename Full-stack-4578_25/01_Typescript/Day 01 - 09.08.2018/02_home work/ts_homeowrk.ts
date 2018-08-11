
/**

  @function get_max_of_array shows the array on the console log
  @param array of numbers.
  @returns void

*/

function showArray(arr: number[]) :void {

    console.log("Array numbers: ",arr);

}

/**

  @function getSumOfArray
  @param array of numbers.
  @returns summary of array numbers.

*/

function getSumOfArray(arr: number[]): number {

    let sum: number = 0;

    for (let i = 0; i < arr.length; i++) {

        sum = sum + arr[i];

    }

    return sum;

}

/**

  @function getAvgOfArray
  @param array of numbers.
  @returns avarge of array numbers;

*/


function getAvgOfArray(arr: number[]): number {

    let sum: number = 0;

    for (let i = 0; i < arr.length; i++) {

        sum = sum + arr[i];

    }

    let avg:number = 0;

    avg = sum / arr.length;

    return avg;

}

/**

  @function getMaxOfArray
  @param array of numbers.
  @returns The max number in the array.

*/

function getMaxOfArray(arr: number[]): number {

    return Math.max(...arr);

}

/**

  @function getMinOfArray
  @param array of numbers.
  @returns The min number in the array.

*/

function getMinOfArray(arr: number[]): number {

    return Math.min(...arr);

}

//----------------------------------------------------

/**

  @function getIndexOfMaxNumberInArray
  @param array of numbers.
  @returns The index of max number in the array.

*/

function getIndexOfMaxNumberInArray(arr: number[]): number {

    let max: number = Math.max(...arr);

    return arr.indexOf(max);

}

/**

  @function getIndexOfMinNumberInArray
  @param array of numbers.
  @returns The index of min number in the array.

*/

function getIndexOfMinNumberInArray(arr: number[]): number {

    let min: number = Math.min(...arr);

    return arr.indexOf(min);

}

//----------------------------------------------------

/**

  @function getSumOfEvenNumbersInArray
  @param array of numbers.
  @returns The sum of even numbers in the array
*/

function getSumOfEvenNumbersInArray(arr: number[]): number {

    let sum: number = 0;

    for (let i = 0; i < arr.length; i++) {

        console.log(arr[i]);
        if (arr[i] % 2 == 0) {

            console.log(arr[i]);
            sum = sum + arr[i];

        }

    }

    return sum;

}

/**

  @function getSumOfOddNumbersInArray
  @param array of numbers.
  @returns The sum of odd numbers in the array
*/

function getSumOfOddNumbersInArray(arr: number[]): number {

    let sum: number = 0;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] % 2 != 0) {

            sum = sum + arr[i];

        }

    }

    return sum;

}

/**

  @function getCountOfPositiveNumbersInArray
  @param array of numbers.
  @returns Count of positive numbers in array
*/

function getCountOfPositiveNumbersInArray(arr: number[]): number {

    let positiveNumsArray: number[] = [];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] > 0) {

            positiveNumsArray.push(arr[i]);

        }

    }

    return positiveNumsArray.length;

}

/**

  @function getCountOfZeroNumbersInArray
  @param array of numbers.
  @returns Count of zero numbers in array
*/

function getCountOfZeroNumbersInArray(arr: number[]): number {

    let zeroNumsArray: number[] = [];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] == 0) {

            zeroNumsArray.push(arr[i]);

        }

    }

    return zeroNumsArray.length;

}


let arr1: number[] = [10, 54, 16, 17, 89, 65, 41, 47, 85, 0];

showArray(arr1);

console.log("Sum of array1: ", getSumOfArray(arr1));
console.log("Avg of array1: ", getAvgOfArray(arr1));

console.log("Max number in array1: ", getMaxOfArray(arr1));
console.log("Min number in array1: ", getMinOfArray(arr1));

console.log("Index of max number in array1: ", getIndexOfMaxNumberInArray(arr1));
console.log("Index of min number in array1: ", getIndexOfMinNumberInArray(arr1));

console.log("Sum of even numbers in array1: ", getSumOfEvenNumbersInArray(arr1));
console.log("Sum of odd numbers in array1: ", getSumOfOddNumbersInArray(arr1));

console.log("Count of positive numbers in array1: ", getCountOfPositiveNumbersInArray(arr1));
console.log("Count of zero numbers in array1: ", getCountOfZeroNumbersInArray(arr1));

/**

  @function printMaxOfArrayPrintNumbersOfMaxNumber
  @param none
  @returns none
*/

function printMaxOfArrayPrintNumbersOfMaxNumber() :void {
   let arr2: number[] = new Array<number>(20);

    for (let i = 0; i < arr2.length; i++) {

        arr2[i] = parseFloat(prompt("הכנס מספר"));

    }

    console.log("Max number in array2: ", getMaxOfArray(arr2));

    let maxNumberArray = ("" + getMaxOfArray(arr2)).split("");

    console.log("Numbers of max number in array2: ");

    for (let i = 0; i < maxNumberArray.length; i++) {

        console.log(maxNumberArray[i]);

    }
}

printMaxOfArrayPrintNumbersOfMaxNumber();
