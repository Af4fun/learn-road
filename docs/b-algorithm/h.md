---
title: 动态规划
group:
  title: 一些算法
---

> 动态规划 递归的时候 缓存上一次的结果

### 斐波拉切

> 经典题目 动态专业方程 dp[i] = dp[i-1]+ dp[i-2]

```js
function frib(n) {
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  let i = 2;
  while (i < n) {
    dp[i] = dp[i - 1] + dp[i - 2];
    i++;
  }
  return dp[n - 1];
}
```

### 爬楼梯

> 动态转移方程 dp[i] = dp[i-1] + dp[i-2]; dp[0] = 1; dp[1] = 1;

```js
function plt(n) {
  if (n <= 1) return 1;
  const dp = [1];
  dp[1] = 1;
  let i = 2;
  while (i <= n) {
    dp[i] = dp[i - 1] + dp[i - 2];
    i++;
  }
  return dp[n];
}
```

### 路径搜索

```js
function pathSearch(m, n) {
  const dp = new Array(m).fill().map(() => new Array(n));
  dp[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 && j !== 0) {
        dp[i][j] = 1;
      } else if (i !== 0 && j == 0) {
        dp[i][j] = 1;
      } else if (i !== 0 && j !== 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
}
```
