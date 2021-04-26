function diffArray(arr1, arr2) {
    var newArr = [];
    function atFirst (arr1,arr2){
      for (var i = 0; i < arr1.length; i++){
        if (!arr2.includes(arr1[i])){
          newArr.push(arr1[i])
        }
      }
    };
    atFirst(arr1, arr2);
    atFirst(arr2, arr1);
    return newArr;
  }
  
 console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"])) ;