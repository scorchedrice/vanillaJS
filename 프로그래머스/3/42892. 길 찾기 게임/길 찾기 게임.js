// 노드 클래스 정의, 좌우자식과 본인 노드 번호, 좌표를 가지고 있음.
class Node {
    constructor(node, coord) {
        this.node = node;
        this.coord = coord;
        this.left = null;
        this.right = null;
    }
}

// 클래스 외부에서 사용할 메서드(진입) : no underbar
// 클래스 내부에서 재귀로 사용할 메서드 : underbar
class BinaryTree {
    constructor(rootNode) {
        this.root = rootNode;
    }
    insert(node) {
        this._insert(this.root, node);
    }
    _insert(parent, node) {
        if (parent.coord[0] > node.coord[0]) {
            if (!parent.left) {
                parent.left = node
            } else {
                this._insert(parent.left, node);
            }
        } else {
            if (!parent.right) {
                parent.right = node;
            } else {
                this._insert(parent.right, node);
            }
        }
    }
    preOrder() {
        const orderList = [];
        this._preOrder(this.root, orderList);
        return orderList
    }
    _preOrder(node, arr) {
        if (node) {
            arr.push(node.node);
            this._preOrder(node.left, arr);
            this._preOrder(node.right, arr);
        }
    }
    posOrder() {
        const orderList = [];
        this._posOrder(this.root, orderList);
        return orderList
    }
    _posOrder(node, arr) {
        if (node) {
            this._posOrder(node.left, arr);
            this._posOrder(node.right, arr);
            arr.push(node.node);
        }
    }
}

function solution(nodeinfo) {
    const nodeList = [];
    for (let i = 0; i < nodeinfo.length; i++) {
        const classNode = new Node(i+1, nodeinfo[i]);
        nodeList.push(classNode)
    }
    // y축을 기준으로 정렬한다. 맨 앞이 root
    nodeList.sort((a,b) => b.coord[1] - a.coord[1])
    const binary = new BinaryTree(nodeList[0])
    for (let i = 1; i < nodeList.length; i++) {
        binary.insert(nodeList[i])
    }
    
    return [binary.preOrder(), binary.posOrder()]
}