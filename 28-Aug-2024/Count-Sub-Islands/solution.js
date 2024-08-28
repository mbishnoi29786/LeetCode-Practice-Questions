// this is my solution only beats 11% people

/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function(grid1, grid2) 
{
    const m = grid1.length;
    const n = grid1[0].length;

    // Helper function to perform DFS and mark the island
    function dfs(grid, i, j, islandCells) {
        const stack = [[i, j]];
        const cells = [];
        
        while (stack.length > 0) {
            const [x, y] = stack.pop();
            if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 0) continue;

            grid[x][y] = 0; // Mark as visited
            cells.push([x, y]);
            islandCells.push([x, y]);

            // Add 4-directional neighbors
            stack.push([x + 1, y]);
            stack.push([x - 1, y]);
            stack.push([x, y + 1]);
            stack.push([x, y - 1]);
        }

        return cells;
    }

    // Collect all islands in grid2
    const islandsInGrid2 = [];
    const visited = Array.from({ length: m }, () => Array(n).fill(false));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid2[i][j] === 1 && !visited[i][j]) {
                const islandCells = [];
                dfs(grid2, i, j, islandCells);
                if (islandCells.length > 0) {
                    islandsInGrid2.push(islandCells);
                }
            }
        }
    }

    // Restored grid2 for further checks
    const grid2Copy = grid2.map(row => row.slice());

    // to check if each island in grid2 is a sub-island of grid1
    let subIslandCount = 0;

    for (const island of islandsInGrid2) {
        let isSubIsland = true;
        for (const [x, y] of island) {
            if (grid1[x][y] !== 1) {
                isSubIsland = false;
                break;
            }
        }
        if (isSubIsland) {
            subIslandCount++;
        }
    }

    return subIslandCount;
};

let grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]];
let grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]];

console.log(countSubIslands(grid1,grid2));

grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]];
grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]];

console.log(countSubIslands(grid1,grid2));


// most effective solution
var countSubIslands = function (grid1, grid2) {
    let x = grid2.length;
    let y = grid2[0].length;

    function DFS(i, j) {
        if (i < 0 || j < 0 || i >= x || j >= y || grid2[i][j] !== 1) return 0;
        grid2[i][j] = 2;
        return (grid1[i][j] === 1 ? 0 : 1) +
            DFS(i - 1, j) +
            DFS(i, j - 1) +
            DFS(i + 1, j) +
            DFS(i, j + 1);
    }
    let res = 0;
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (grid2[i][j] === 1) {
                if (DFS(i, j) === 0) {
                    res++;
                }
            }
        }
    }
    return res;
};