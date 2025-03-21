class Node {
    constructor(node, x_axis) {
        this.left = null;
        this.right = null;
        this.node = node;
        this.x = x_axis
    }
}

class Tree {
    constructor(root) {
        this.root = root;
    }
    
    insert(node) {
        this._insert(this.root, node);
    }
    _insert(parent, child) {
        if (parent.x < child.x) {
            if (!parent.right) {
                parent.right = child;
            } else {
                this._insert(parent.right, child);
            }
        } else {
            if (!parent.left) {
                parent.left = child;
            } else {
                this._insert(parent.left, child);
            }
        }
    }
    pre() {
        const arr = [];
        const returnValue = this._pre(this.root, arr);
        return returnValue;
    }
    _pre(node, arr) {
        if (node) {
            arr.push(node.node);
            this._pre(node.left, arr)
            this._pre(node.right, arr)    
        }
        return arr
    }
    pos() {
        const arr = [];
        const returnValue = this._pos(this.root, arr);
        return returnValue
    }
    _pos(node, arr) {
        if (node) {
            this._pos(node.left, arr)
            this._pos(node.right, arr)
            arr.push(node.node)
        }
        return arr
    }
}

function solution(nodeinfo) {
    const matrix = [];
    for (let i = 1; i < nodeinfo.length + 1; i++) {
        matrix.push([i, nodeinfo[i-1]])
    }
    matrix.sort((a,b) => b[1][1] - a[1][1])
    
    const root = new Node(matrix[0][0], matrix[0][1][0])
    const tree = new Tree(root);
    
    
    for (let i = 1; i < matrix.length; i++) {
        const nodeClass = new Node(matrix[i][0], matrix[i][1][0])
        tree.insert(nodeClass)
    }
    return [tree.pre(), tree.pos()]
}