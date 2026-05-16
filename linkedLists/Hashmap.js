import {LinkedList} from "./linkedLists.js";

const item = (key,value) => {
    return {key, value};
}

class HashMap{
    constructor(loadFactor= 0.75, capacity=16){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.theArray = [];
        this.maxEntries = this.loadFactor * this.capacity;
    }
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;

        for(let i = 0;i <  key.length; i++ ){
            hashCode  = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= this.capacity;
        }

        return hashCode;

    }
    set(key, value){
        const index = this.hash(key);
        const newItem = item(key,value);
        //check if it contains a linked list.
        if(index in this.theArray){
            //check if the linked list contains the key
            const bucket = this.theArray[index];
            let current = bucket.hd;
            while (current !== null) {
                if (current.value.key === key) {
                    current.value = newItem;  
                    return;
                }
                current = current.nxt_pointer;
            }
            bucket.append(newItem);
            
        }else{
            const bucket = new LinkedList();
           
            bucket.append(newItem);
            this.theArray[index] = bucket
        }


    }
    get(key){
        const index = this.hash(key);
        if(index in this.theArray){
            const bucket = this.theArray[index];
            const fetchedValue = bucket.containsKey(key)
            if(fetchedValue != false){
                return fetchedValue;
            }else{
                return null;
            }
        }else{
            return "the bucket isn't there";
        }  

    }
    has(key){
        const index = this.hash(key);
        
        if (index in this.theArray){
            const bucket = this.theArray[index];
            let current = bucket.hd;
            while (current !== null) {
                if(current.value.key === key){
                    return true;
                }
                current = current.nxt_pointer;
            }
        

        }
        
        return false;

    }
    remove(key){
        const index  = this.hash(key);
        if(this.has(key)){
            const bucket = this.theArray[index];
            let current  = bucket.hd;
            let i = 0 ;
            while(current != null){
                if(current.value.key === key){
                    bucket.removeAt(i);
                    return true;
                }
                current = current.nxt_pointer;
                i++;    
            }
                        
        }
        return false;
   

    }
    length(){
        let numberKeys = 0 ;
        for(const index in this.theArray){
            numberKeys += this.theArray[index].size();
        }
        return numberKeys;

    }
    clear(){
        this.theArray = [];
    }
    keys(){
        let result = [];
        for(const index in this.theArray){
            let current = this.theArray[index].hd;
            while(current !== null){
                result.push(current.value.key)
                current = current.nxt_pointer;
            }
        }
        return result;
    }
    values(){
        let result = [];
        for(const index in this.theArray){
            let current = this.theArray[index].hd;
            while(current !== null){
                result.push(current.value.value)
                current = current.nxt_pointer;
            }
        }
        return result;
    }
    entries(){
        let result = [];
        for(const index in this.theArray){
            let current = this.theArray[index].hd;
            while(current !== null){
                result.push([current.value.key,current.value.value])
                current = current.nxt_pointer;
            }
        }
        return result;
        
        }
}


const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');

console.log(test.length());           // 3
console.log(test.keys());             // ['apple', 'banana', 'carrot'] (any order)
console.log(test.values());           // ['red', 'yellow', 'orange'] (any order)
console.log(test.entries());          // [['apple','red'], ...] (any order)

console.log(test.remove('banana'));   // true
console.log(test.remove('banana'));   // false
console.log(test.length());           // 2

test.clear();
console.log(test.length());           // 0