class Queue {
    constructor() {
        this.front = 0;
        this.back = -1;
        this.qMap = new Map();
    }
    push(element) {
        this.back ++
        this.qMap.set(this.back, element);
    }
    popleft() {
        const pickValue = this.qMap.get(this.front);
        this.qMap.delete(this.front);
        this.front ++
        return pickValue;
    }
    size() {
        return this.back - this.front + 1;
    }
}

class Node {
    constructor(nodeNumber, coord) {
        this.node = nodeNumber;
        this.left = null;
        this.right = null;
        this.coord = coord;
    }
}

class Tree {
    constructor(node) {
        this.root = node
    }
    insert(nd) {
        this._insertNode(this.root, nd);
    }
    _insertNode(parent, child) {
        if (parent.coord[0] < child.coord[0]) {
            // 자식 x좌표가 더 크면 right
            // 이 때 오른쪽이 있다면
            if (parent.right) {
                this._insertNode(parent.right, child)
            } else {
                parent.right = child;
            }
        } else {
            if (parent.left) {
                this._insertNode(parent.left, child)
            } else {
                parent.left = child;
            }
        }
    }
    pre() {
        const result = [];
        this._pre(this.root, result);
        return result
    }
    _pre(nd, arr) {
        if (nd) {
            arr.push(nd.node);
            this._pre(nd.left, arr)
            this._pre(nd.right, arr)
        }
    }
    pos() {
        const result = [];
        this._pos(this.root, result);
        return result
    }
    _pos(nd, arr) {
        if (nd) {
            this._pos(nd.left, arr)
            this._pos(nd.right, arr)
            arr.push(nd.node)
        }
    }
}

function solution(nodeinfo) {
    var answer = [[]];
    if (nodeinfo.length === 1) return [[1],[1]]
    
    const matrix = [];
    const nodeMap = new Map();
    let mx = 0;
    let rootNode = 0;
    
    const layer = new Set();
    for (let i = 0; i < nodeinfo.length; i++) {
        const node = new Node(i+1, nodeinfo[i])
        matrix.push(node)
        nodeMap.set(i+1, node);
        if (mx < nodeinfo[i][1]) {
            mx = nodeinfo[i][1]
            rootNode = node;
        }
        layer.add(nodeinfo[i][1])
    }
    
    nodeMap.set(rootNode.node, rootNode);
    
    const sortedNodes = Array.from(nodeMap.values()).sort((a,b) => (b.coord[1] - a.coord[1]))
    const sortedLayer = Array.from(layer).sort((a,b) => b-a)
    let nowLayerIndex = 0;
    const tree = new Tree(sortedNodes[0]);
    for (let i = 1; i < sortedNodes.length; i++) {
        tree.insert(sortedNodes[i])
        // console.log(sortedNodes[i].coord)
    }
    
    // console.log(tree)
    // console.log('pre',tree.pre())
    // console.log('pos',tree.pos())
    
    return [tree.pre(), tree.pos()]
}