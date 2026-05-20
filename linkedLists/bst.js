class Node{
    constructor(data){
        this.rightchild = null,
        this.data = data,
        this.leftchild = null
    }
}
class Tree{
    constructor(array){
        this.rootnode = this.#buildTree(array);
        
    }
    #buildTree(array){
        const sortedarr = array.sort((a,b) => a - b);
        const uniquearr = sortedarr.filter((element,index,arr) => {
            return element !== arr[index + 1]});

        return this.#sortedArrtoBST(uniquearr,0,uniquearr.length-1);


    }

    #sortedArrtoBST(arr,start,end){
        if(start >  end) return null;

        let mid = start + Math.floor((end - start)/2);
        let root = new Node(arr[mid]);

        root.leftchild = this.#sortedArrtoBST(arr,start,mid-1);
        root.rightchild = this.#sortedArrtoBST(arr,mid+1, end);

        return root;
    }
    includes(value){
        let currentNode = this.rootnode
        while(currentNode !== null){
            if(value === currentNode.data) return true;
        
            else if(value > currentNode.data){
                currentNode = currentNode.rightchild
            }
            else{
                currentNode = currentNode.leftchild
            }
        }
       
    
    }
    insert(value){
        const newNode = new Node(value)
        if (this.rootnode === null) {
            this.rootnode = newNode;
            return this.rootnode;
        }

        let currentNode = this.rootnode;
        let parrentNode  = null;
        
        while(currentNode !== null){
            parrentNode = currentNode;
            if(value === currentNode.data) return;
            

            if(currentNode.data > value && currentNode !== null){
                currentNode = currentNode.leftchild;
            }
            else if(currentNode.data < value && currentNode !== null){
                currentNode = currentNode.rightchild;
            }else break;


        }
        if(parrentNode.data > value) parrentNode.leftchild = newNode;
        else parrentNode.rightchild = newNode;
        return this.rootnode;

    }
     
}
// function for visualing the BST
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightchild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.leftchild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


const Test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, ,43,44,67, 6345, 324])
prettyPrint(Test.rootnode)


