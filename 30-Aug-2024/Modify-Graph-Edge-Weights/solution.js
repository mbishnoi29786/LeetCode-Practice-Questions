/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @param {number} target
 * @return {number[][]}
 */
var modifiedGraphEdges = function(n, edges, source, destination, target) {
    const INF = Number.MAX_VALUE;
    
    // Helper function: Dijkstra's algorithm
    function dijkstra(start, adj) {
        const dist = new Array(n).fill(INF);
        dist[start] = 0;
        const minHeap = [[0, start]]; // [distance, node]
        
        while (minHeap.length > 0) {
            minHeap.sort((a, b) => a[0] - b[0]); // Min-heap
            const [curDist, u] = minHeap.shift();
            if (curDist > dist[u]) continue;
            
            for (const [v, weight] of adj[u]) {
                const newDist = curDist + weight;
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    minHeap.push([newDist, v]);
                }
            }
        }
        
        return dist;
    }
    
    // Step 1: Build adjacency list for known weights
    const adjList = Array.from({ length: n }, () => []);
    const unknownEdges = [];
    
    for (const [u, v, w] of edges) {
        if (w === -1) {
            unknownEdges.push([u, v]);
        } else {
            adjList[u].push([v, w]);
            adjList[v].push([u, w]);
        }
    }
    
    // Step 2: Compute shortest paths from source and destination
    const distFromSource = dijkstra(source, adjList);
    const distFromDestination = dijkstra(destination, adjList);
    
    const initialDist = distFromSource[destination];
    if (initialDist > target) return [];
    
    const requiredSum = target - initialDist;
    
    // Step 3: Attempt to set the weights of the unknown edges
    // Use a priority queue to ensure we set the minimum weights needed
    const updatedEdges = [];
    const minHeap = [];
    
    for (const [u, v] of unknownEdges) {
        const minPossibleWeight = 1;
        const maxPossibleWeight = 2 * 10 ** 9;
        const additionalDist = target - distFromSource[u] - distFromDestination[v];
        const weight = Math.min(maxPossibleWeight, additionalDist + minPossibleWeight);
        
        updatedEdges.push([u, v, weight]);
        adjList[u].push([v, weight]);
        adjList[v].push([u, weight]);
        
        minHeap.push([weight, u, v]);
    }
    
    // Step 4: Verify if the shortest path matches the target after modifications
    const finalDistFromSource = dijkstra(source, adjList);
    if (finalDistFromSource[destination] !== target) return [];
    
    // Return the modified edges
    const edgeMap = new Map();
    for (const [u, v, w] of edges) {
        if (w === -1) {
            const updatedEdge = updatedEdges.find(([x, y]) => (x === u && y === v) || (x === v && y === u));
            edgeMap.set(`${u},${v}`, updatedEdge ? updatedEdge[2] : 1);
            edgeMap.set(`${v},${u}`, updatedEdge ? updatedEdge[2] : 1);
        } else {
            edgeMap.set(`${u},${v}`, w);
            edgeMap.set(`${v},${u}`, w);
        }
    }
    
    return edges.map(([u, v, w]) => [u, v, edgeMap.get(`${u},${v}`) || edgeMap.get(`${v},${u}`)]);
};

// Example test cases
let n = 5, 
    edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], 
    source = 0, 
    destination = 1, 
    target = 5;
console.log(modifiedGraphEdges(n, edges, source, destination, target)); // [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]

n = 3, 
edges = [[0,1,-1],[0,2,5]], 
source = 0, 
destination = 2, 
target = 6;
console.log(modifiedGraphEdges(n, edges, source, destination, target)); // []

n = 4, 
edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], 
source = 0, 
destination = 2, 
target = 6;
console.log(modifiedGraphEdges(n, edges, source, destination, target)); // [[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
