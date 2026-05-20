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
    #getSuccessor(curr){
        curr = curr.rightchild;
        while(curr !== null && curr.leftchild !== null)
            curr = curr.leftchild;
        return curr;

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
        return false;
       
    
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
    deleteItem(value,parrentNode=this.rootnode){
        if(parrentNode === null) return;


        if(parrentNode.data > value){
            parrentNode.leftchild = this.deleteItem(value,parrentNode.leftchild); 
        }
        else if(parrentNode.data < value){
            parrentNode.rightchild  = this.deleteItem(value,parrentNode.rightchild);
        }
        else{
            //node with 0 or 1 child
            if(parrentNode.leftchild === null){
                return parrentNode.rightchild;  
            }
            if(parrentNode.rightchild === null){
                return parrentNode.leftchild;
            }
            //Node with two children
            const succ = this.#getSuccessor(parrentNode);
            parrentNode.data = succ.data;
            parrentNode.rightchild = this.deleteItem(succ.data,parrentNode.rightchild);

        }
        return parrentNode;
    }
    levelOrderForEach(callback,parrentNode=this.rootnode){
        this.Queue = [];
        if(parrentNode === null) return;
        this.Queue.push(parrentNode);
        if(callback == null) throw new Error("where the fuck's the function");
        while(this.Queue.length > 0){
            let temp = this.Queue[0];
            if(temp.leftchild != null){
                this.Queue.push(temp.leftchild);
            }
            if(temp.rightchild != null){
                this.Queue.push(temp.rightchild);
            }
            callback(this.Queue[0].data );
            this.Queue.splice(0,1);
        }
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
function print(item){
    console.log(item);
}


const Test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, ,43,44,67, 6345, 324])
prettyPrint(Test.rootnode)

Test.deleteItem(324);


Test.levelOrderForEach(print)
prettyPrint(Test.rootnode)