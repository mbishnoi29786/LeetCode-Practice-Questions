// mysolution -->
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
var maxProbability = function(n, edges, succProb, start_node, end_node) {
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const prob = succProb[i];
        graph[a].push([b, prob]);
        graph[b].push([a, prob]);
    }
    
    const pq = new MaxHeap();
    pq.push([start_node, 1]);
    
    const probabilities = Array(n).fill(0);
    probabilities[start_node] = 1;
    
    while (!pq.isEmpty()) {
        const [currentNode, currentProb] = pq.pop();
        
        if (currentNode === end_node) {
            return currentProb;
        }
        
        for (const [neighbor, edgeProb] of graph[currentNode]) {
            const newProb = currentProb * edgeProb;
            if (newProb > probabilities[neighbor]) {
                probabilities[neighbor] = newProb;
                pq.push([neighbor, newProb]);
            }
        }
    }
    
    return 0;

};

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        this._heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);
        return root;
    }

    _heapifyUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (index > 0 && this.heap[index][1] > this.heap[parentIndex][1]) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            this._heapifyUp(parentIndex);
        }
    }

    _heapifyDown(index) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        let largest = index;

        if (leftIndex < this.heap.length && this.heap[leftIndex][1] > this.heap[largest][1]) {
            largest = leftIndex;
        }
        if (rightIndex < this.heap.length && this.heap[rightIndex][1] > this.heap[largest][1]) {
            largest = rightIndex;
        }
        if (largest !== index) {
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            this._heapifyDown(largest);
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}



let n = 3, 
    edges = [[0,1],[1,2],[0,2]],
    succProb = [0.5,0.5,0.3],
    start = 0,
    end = 2;
console.log(maxProbability(n,edges,succProb,start,end));

n = 3;
edges = [[0,1],[1,2],[0,2]];
succProb = [0.5,0.5,0.3];
start = 0;
end = 2;
console.log(maxProbability(n,edges,succProb,start,end));

n = 3;
edges = [[0,1]];
succProb = [0.5];
start = 0;
end = 2;

console.log(maxProbability(n,edges,succProb,start,end));



// the best solution -->
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
var maxProbability = function(n, edges, succProb, start_node, end_node) {
    let maxProb = new Array(n).fill(0);
    maxProb[start_node] = 1.0;

    for (let i = 0; i < n - 1; i++) {
        let hasUpdate = false;
        for (let j = 0; j < edges.length; j++) {
            let u = edges[j][0];
            let v = edges[j][1];
            let pathProb = succProb[j];
            
            if (maxProb[u] * pathProb > maxProb[v]) {
                maxProb[v] = maxProb[u] * pathProb;
                hasUpdate = true;
            }
            if (maxProb[v] * pathProb > maxProb[u]) {
                maxProb[u] = maxProb[v] * pathProb;
                hasUpdate = true;
            }
        }
        if (!hasUpdate) {
            break;
        }
    }

    return maxProb[end_node];
};