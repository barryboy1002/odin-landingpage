class Node{
    constructor(value=null,nxt_pointer =null)
    {
        this.value  = value;
        this.nxt_pointer = nxt_pointer;
    }

}
class LinkedList{
    constructor(){
        this.hd = null;
        this.tl = null;
        this.n = 0
    }
    append(value){
        if(this.hd === null){
            this.hd = new Node(value);
        }else{
             let theNode = new Node(value);
            if(this.tl === null){
                this.hd.nxt_pointer = theNode;
                this.tl = theNode;
            }else{
                this.tl.nxt_pointer = theNode;
                this.tl = theNode;
            }
        }
        this.n++;

    }
    toString(){
        let currentNode = this.hd;
        while(currentNode !== null){
            console.log("{" + currentNode.value + "} -> ");
            currentNode = currentNode.nxt_pointer;
        }
    }
    prepend(value){
        let theNode = new Node(value);
        theNode.nxt_pointer = this.hd;
        this.hd = theNode; 

        this.n++;
    }
    size(){
        return this.n;

    }
    head(){
        if(this.hd === null){
            return undefined;
        }
        else{
            return this.hd.value
        }
    }
    tail(){
        if(this.tl === null){
            return undefined;
        }
        else{
            return this.tl.value
        }
    }

    //the complex ones
    at(index){
        let currentNode = this.hd;
        if(index > this.n){
            return undefined;
        }
        for(let i = 0;i <index;i++){
            currentNode = currentNode.nxt_pointer
        }
        return currentNode.value;
    }
    pop(){
        if(this.hd === null){
            return undefined;
        }
        let headvalue = this.hd.value;
        this.hd  = this.hd.nxt_pointer;
        this.n--;
        return headvalue;
        
    }
    contains(value){
        let currentNode = this.hd;
        for(let i = 0; i < this.n;i++){
            if(currentNode.value === value){
                return true;
            }
            currentNode = currentNode.nxt_pointer
        }
        return false;
    }
    findIndex(value){
        let currentNode = this.hd;
        for(let i = 0; i < this.n;i++){
            if(currentNode.value === value){
                return i;
            }
            currentNode = currentNode.nxt_pointer
        }
        return -1;
    }





}



const list = new LinkedList()

list.append("dog");
list.append("hoe");
list.append("milk");
list.prepend("cook")
console.log(list.head(), list.size(), list.tail() );



list.toString()

list.pop();
console.log(list.head(), list.size(), list.tail() ,list.contains("jin"));
list.toString();    
