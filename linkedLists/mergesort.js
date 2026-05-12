function mergeSort(arr){
    //for the basic merging
    if(arr.length <= 1){
        return arr;
    }else{
        //splitting the array
        let mid = Math.floor(arr.length/2);
        let arrLeft = arr.slice(0,mid);
        let arrRight = arr.slice(mid);
        //recursiviness of splitting begins here
        let sortedLeft = mergeSort(arrLeft);
        let sortedRight = mergeSort(arrRight);

        return merge(sortedLeft,sortedRight);
    }
}
function merge(left,right){
    let result = [];
    let i = 0;
    let j = 0;
    while( i < left.length && j < right.length){
        if(left[i] < right[j]){
            result.push(left[i])
            i++;
        }
        else{
            result.push(right[j])
            j++;
        }
    }
    return  result.concat(left.slice(i)).concat(right.slice(j));
}


console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));