// my solution beats 77.88 percent

/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function(stones) 
{
    let n = stones.length;
    let uf = new UnionFind(n);
    let rowMap = new Map();
    let colMap = new Map();
    
    for (let i = 0; i < n; i++) {
        let [x, y] = stones[i];
        
        if (!rowMap.has(x)) rowMap.set(x, i);
        else uf.union(i, rowMap.get(x));
        
        if (!colMap.has(y)) colMap.set(y, i);
        else uf.union(i, colMap.get(y));
    }
    
    let uniqueRoots = new Set();
    for (let i = 0; i < n; i++) {
        uniqueRoots.add(uf.find(i));
    }
    
    return n - uniqueRoots.size;
};

// helper class
class UnionFind 
{
    constructor(size) 
    {
        this.parent = Array(size).fill(0).map((_, i) => i);
        this.rank = Array(size).fill(0);
    }
    
    find(x) 
    {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) 
    {
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX] += 1;
            }
        }
    }
}

let stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]];
console.log(removeStones(stones));


stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
console.log(removeStones(stones));

stones = [[0,0]]
console.log(removeStones(stones));



// the best solution 
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
    const { rows, cols } = stones.reduce(({ rows, cols }, [i, j]) => {
        return {
            rows: Math.max(rows, i), cols: Math.max(cols, j)
        }
    }, { rows: 0, cols: 0 });
    const dsj = new DisjointSet(rows + cols + 1);
    const stoneNodes = new Set();
    stones.forEach(([i, j]) => {
        const node1 = i;
        const node2 = j + rows + 1;
        stoneNodes.add(node1);
        stoneNodes.add(node2);
        dsj.union(node1, node2);
    });
    let count = 0;
    Array.from(stoneNodes).forEach(node => {
        if (dsj.findUltParent(node) === node)
            count++;
    })
    return stones.length - count;
};


class DisjointSet {
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (val, idx) => idx);
        this.size = Array(n + 1).fill(1);
        this.componentSize = 0;
    }
    getComponentSize() {
        let count = 0;
        for (let i = 0; i < this.parent.length; i++) {
            if (this.parent[i] === i)
                count++;
        }
        return this.componentSize = count;
    }
    findUltParent(u) {
        if (this.parent[u] === u)
            return u;
        return this.parent[u] = this.findUltParent(this.parent[u]);
    }
    union(u, v) {
        const ulpU = this.findUltParent(u);
        const ulpV = this.findUltParent(v);
        if (ulpU === ulpV)
            return;
        if (this.size[ulpU] <= this.size[ulpV]) {
            this.parent[ulpU] = ulpV;
            this.size[ulpV] += this.size[ulpU];
        } else {
            this.parent[ulpV] = ulpU;
            this.size[ulpU] += this.size[ulpV];
        }
    }
}