// Чтобы проверить сортировку откомментируйте соответствующий console.log()

// bubbleSort
// console.log(bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))

// // insertionSort
// console.log(insertionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));

// // selectionSort
// console.log(selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));

// // quickSort
// console.log(quickSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));

// // mergeSort
// console.log(mergeSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));

function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        if (array[j] > array[j + 1])
          [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Using ES6 array destructuring to swap
      }
    }
    return array;
  }

function selectionSort(array) {
    for (let i = 0; i < array.length-1; i+=1) {
        let min = i;
        for (let j = i + 1; j < array.length; j+=1) {
            if (array[j] < array[i]) min = j;
        }
        [array[min], array[i]] = [array[i], array[min]]
    }
    return array;

  }
 


function insertionSort(array) {
    for(let i = 1; i<array.length; i+=1) {
        let temp = array[i]
        let j;
        for (j = i - 1; j > -1 && array[j] > temp; j-=1) {
            array[j+1] = array[j];
        }
        array[j+1] = temp
    }
    return array;
  }
  
  

function quickSort(array) {
    if (array.length > 1) {
        let el = array[0];
        let lessArr = [],
            greaterArr = [],
            equalArr = [];
        for(item of array){
            if (item < el){
                lessArr.push(item)
            } else if(item > el) {
                greaterArr.push(item)
            } else {
                equalArr.push(item);
            }
        }
        return [...quickSort(lessArr), ...equalArr, ...quickSort(greaterArr)]
    }
    return array;
}



function mergeSort(array) {
    if (array.length == 1) return array;
    console.log(array)
    let midInd = Math.floor(array.length/2);
    console.log(midInd)
    return merge(
      mergeSort(array.slice(0, midInd)), mergeSort(array.slice(midInd))
    )
    function merge(arr1, arr2) {
      const res = [];
      while (arr1.length && arr2.length) {
        if (arr1[0] < arr2[0]) {
          res.push(arr1.shift());
        } else if (arr1[0] > arr2[0]) {
          res.push(arr2.shift())
        } else {
          res.push(arr1.shift(), arr2.shift())
        }
      }
      return [...res, ...arr1, ...arr2];
    }
    // Only change code above this line
  }
  
  
