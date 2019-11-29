<h3>[819] Most Common Word></h3>

$ split input string into lowercase words
> String[] words s.toLowerCase().split("\\W+");

> solution
```java
class Solution {
    public String mostCommonWord(String paragraph, String[] banned) {
        String[] words = paragraph.toLowerCase().split("\\W+");
        HashSet<String> ban = new HashSet<>(Arrays.asList(banned));
        HashMap<String, Integer> map = new HashMap<>();
        for (String word : words) {
            if (!ban.contains(word)) {
                map.put(word, map.getOrDefault(word, 0) + 1);
            }
        }
        int max = 0;
        String res = "";
        for (String word : map.keySet()) {
            if (map.get(word) > max) {
                max = map.get(word);
                res = word;
            }
        }
        return res;
    }
}
```


<h3>[957] Prison Cells After N Days</h3>

```java
class Solution {
    public int[] prisonAfterNDays(int[] cells, int N) {
        int[] first = new int[cells.length], next = new int[cells.length];
        for (int cycle = 0; N-- > 0; cells = next.clone(), cycle++) {
            for (int i = 1; i < cells.length - 1; i++)
                next[i] = (cells[i - 1] == cells[i + 1] ? 1 : 0);
            if (cycle == 0) first = next.clone();
            else if (Arrays.equals(next, first)) N %= cycle;
        }
        return cells;
    }
}
```

<h3>[973] K Closest Points to Origin</h3>

> quick select O(n) for each select, and since at each step we exclude half range, then should be O(nlogn)
```java
class Solution {
    public int[][] kClosest(int[][] points, int K) {
        int lo = 0, hi = points.length - 1;
        while (lo <= hi) {
            int mid = partition(points, lo, hi);
            if (mid == K - 1)
                break;
            else if (mid < K - 1)
                lo = mid + 1; // search for larger partition point, exclude half
            else
                hi = mid - 1; // search for lower partition point, exclude half            
        }
        return Arrays.copyOfRange(points, 0, K);
    }
    
    private int partition(int[][] points, int l, int r) {
        int[] pivot = points[r];
        int i = l - 1;
        for (int j = l; j < r; j++) {
            if (compare(points[j], pivot) <= 0)
                swap(points, ++i, j);            
        }
        swap(points, ++i, r);
        return i;
        
    }
    
    private void swap(int[][] points, int i, int j) {
        int[] temp = points[i];
        points[i] = points[j];
        points[j] = temp;
    }
    
    private int compare(int[] p1, int[] p2) {
        return p1[0] * p1[0] + p1[1] * p1[1] - p2[0] * p2[0] - p2[1] * p2[1];
    }
}
```



topics
> quick select, quick sort, top k

> sort, pq, heap


> solution, sorting

```java
class Solution {
    public int[][] kClosest(int[][] points, int K) {
        Arrays.sort(points, (p1, p2) -> (p1[0] * p1[0] + p1[1] * p1[1] - p2[0] * p2[0] - p2[1] * p2[1]));
        return Arrays.copyOfRange(points,0 , K);
    }
}
```

```
1. sorting and return first K elements, O(nlogn) time
                    |
                    |
2. pq, max-heap O(K) space
                    |
                    |
3. quick partitioning, recursive                            class Solution {
    public int[][] kClosest(int[][] points, int K) {
        int lo = 0, hi = points.length - 1;
        while(lo <= hi) {
            int mid = partition(points, lo, hi);
            if (mid == K - 1) 
                break;
            else if (mid < K - 1)
                lo = mid + 1; // search on right for index K - 1
            else
                hi = mid - 1;
        }
        return Arrays.copyOfRange(points,0, K);
    }
    
    private int partition(int[][] points, int l, int r) {
        int[] pivot = points[r];
        int i = l - 1;
        for (int j = l; j < r; j++) {
            if (compare(points[j], pivot) <= 0)
                swap(points, ++i, j);
        }
        swap(points, ++i, r);
        return i;
    }
    
    private void swap(int[][] points, int i, int j) {
        int[] temp = points[i];
        points[i] = points[j];
        points[j] = temp;
    }
    
    private int compare(int[] p, int[] q) {
        return p[0] * p[0] + p[1] * p[1] - q[0] * q[0] - q[1] * q[1];
    }
}        
```

[937] Reorder Log Files [Reorder Log Files ⭐⭐⭐]

> wirte custom ordering

```java
class Solution {
    public String[] reorderLogFiles(String[] logs) {
        Arrays.sort(logs, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                String[] split1 = s1.split(" ", 2);
                String[] split2 = s2.split(" ", 2);
                boolean isDigit1 = Character.isDigit(split1[1].charAt(0));
                boolean isDigit2 = Character.isDigit(split2[1].charAt(0));
                if (isDigit1 && isDigit2) return 0; // return 0 to expect to be stable, can't return -1
                else if (isDigit1 || isDigit2)
                    return (isDigit1 ? 1 : -1);
                else {
                    int cmp = split1[1].compareTo(split2[1]);
                    return (cmp == 0 ? split1[0].compareTo(split2[0]) : cmp);
                }
            }
        });
        return logs;
    }
}
```


<h3>[Treasure Island]</h3> [Treasure Island / Min Distance to Remove the Obstacle (BFS) ⭐⭐⭐]

```java
// https://leetcode.com/discuss/interview-question/347457/Amazon-or-OA-2019-or-Treasure-Island
public class Main {
    static int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    public static int minSteps(char[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[2]);
        grid[0][0] = 'D'; // mark as visited
        int step = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            while (size-- > 0) {
                int[] cur = queue.poll();
                System.out.println(cur[0] + "," + cur[1] + " :" + grid[cur[0]][cur[1]]);
                //if (grid[cur[0]][cur[1]] == 'X') // can't return here will all be 'D' since we alredy marked
                //    return step;
                for (int[] dir : dirs) {
                    int nr = cur[0] + dir[0], nc = cur[1] + dir[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] != 'D') {
                        if (grid[nr][nc] == 'X')
                            return step + 1;
                        grid[nr][nc] = 'D';
                        queue.offer(new int[] {nr, nc});
                    }
                }
            }
            step++;
        }
        return -1;
    }
    

    
    public static void main(String[] args) {
        char[][] grid = {{'O', 'O', 'O', 'O'},
                         {'D', 'O', 'D', 'O'},
                         {'O', 'O', 'O', 'O'},
                         {'X', 'D', 'D', 'O'}};
        System.out.println(minSteps(grid));
    }
}

```


[1167] Minimum Cost to Connect Sticks
[Min Cost to Connect Ropes / Min Time to Merge Files ⭐⭐⭐]


> priority queue, Huffman

> Earlier sticks will be counted again. Therefore, alwasy use current shortest two sticks till only one remains.

> solution

```java
class Solution {
    public int connectSticks(int[] sticks) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int s : sticks) pq.offer(s);
        int sum = 0;
        while (pq.size() > 1) {
            int t = pq.poll() + pq.poll();
            sum += t;
            pq.offer(t);
        }
        return sum;
    }
}
```


> ref

```java
    public int connectSticks(int[] sticks) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int s : sticks) {
            pq.offer(s);
        }
        int sum = 0;
        while (pq.size() > 1) {
            int two = pq.poll() + pq.poll();
            sum += two;
            pq.offer(two);
        }
        return sum;
    }
```



[5] Longest Palindrome Substring


> solution, expanding, which is faster than dp

```java
class Solution {
    int maxIndex = 0;
    int maxLen = 1;
    public String longestPalindrome(String s) {
        int n = s.length();
        if (n < 2) return s;
        for (int i = 0; i < n - 1; i++) {
            extend(s, i, i);
            extend(s, i, i + 1);
        }
        return s.substring(maxIndex, maxIndex + maxLen);
    }
    private void extend(String s, int j, int k) {
        while (j >= 0 && k < s.length() && s.charAt(j) == s.charAt(k)) {
            j--;
            k++;
        }
        if (k - j - 1 > maxLen) {
            maxLen = k - j - 1;
            maxIndex = j + 1;
        }
    }
}
```


> ref

```java
public class Solution {
private int lo, maxLen;

public String longestPalindrome(String s) {
	int len = s.length();
	if (len < 2)
		return s;
	
    for (int i = 0; i < len-1; i++) {
     	extendPalindrome(s, i, i);  //assume odd length, try to extend Palindrome as possible
     	extendPalindrome(s, i, i+1); //assume even length.
    }
    return s.substring(lo, lo + maxLen);
}

private void extendPalindrome(String s, int j, int k) {
	while (j >= 0 && k < s.length() && s.charAt(j) == s.charAt(k)) {
		j--;
		k++;
	}
	if (maxLen < k - j - 1) {
		lo = j + 1;
		maxLen = k - j - 1;
	}
}}
```



> DP solution

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s.length() == 0) return ""; // handle edge case
        int n = s.length();
        int maxIndex = 0, maxLen = 1;
        boolean[][] dp = new boolean[n][n];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                dp[i][j] = (s.charAt(i) == s.charAt(j) && (j - i < 3 || dp[i + 1][j - 1]));
                if (dp[i][j] && j - i + 1 > maxLen) {
                    maxIndex = i;
                    maxLen = j - i + 1;
                }
            }
        }
        return s.substring(maxIndex, maxIndex + maxLen);
    }
}
```



[Movies on Flight (Two Sum Closest)]



$ other description: Given a bag with capacity C as integer value, and an int list, find 2 numbers from the list such that we can fill this bag with min space left.
For example, let the bag capacity C is 10 and
The array list is [1, 2, 3, 4, 5]
The answer is clearly [4, 5]

> may need to change less to <= (less or equal) and just return when equal



[1099] Two Sum Less Than K

won't go into while loop if n < 2

> solution
```java
class Solution {
    public int twoSumLessThanK(int[] A, int K) {
        int max = -1;
        Arrays.sort(A);
        int lo = 0, hi = A.length - 1;
        while (lo < hi) {
            int sum = A[lo] + A[hi];
            if (sum < K) {
                max = Math.max(max, sum);
                lo++;
            } else {
                hi--;
            }
        }
        return max;
    }
}
```



> ref
```java
    public int twoSumLessThanK(int[] A, int K) {
        Arrays.sort(A); // Time cost O(nlogn).
        int max = -1, i = 0, j = A.length - 1; 
        while (i < j) {
            int sum = A[i] + A[j];
            if (sum < K) { // find one candidate.
                max = Math.max(max, sum);
                ++i; // increase the smaller element.
            }else { // >= sum.
                --j; // decrease the bigger element.
            }
        }
        return max;
    }
```

> solution v1

```java
class Solution {
    public int twoSumLessThanK(int[] A, int K) {
        int n = A.length;
        if (n < 2) return -1;
        Arrays.sort(A);
        int res = A[0] + A[1];
        int lo = 0, hi = n - 1;
        while (lo < hi) {
            int sum = A[lo] + A[hi];
            if (sum < K) {
                res = Math.max(res, sum);
                lo++;
            } else {
                hi--;
            }
        }
        return (res >= K ? -1 : res);
        
    }
}
```




$ Related questions
> actually a little bit different from [16]
[16] 3Sum Closest
// towards next candidate

> solution, put sum in the while loop not outside
```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int n = nums.length;
        if (n < 3) return 0;
        Arrays.sort(nums);
        int res = nums[0] + nums[1] + nums[2];
        for (int i = 0; i <= n - 3; i++) {
            int lo = i + 1, hi = n - 1;
            while (lo < hi) {
                int sum = nums[i] + nums[lo] + nums[hi];
                if (sum == target)
                    return target;
                else if (sum > target)
                    hi--; // towards next candidate
                else
                    lo++;
                
                if (Math.abs(sum - target) < Math.abs(res - target))
                    res= sum;
            }
        }
        return res;
    }
}
```

[Shortest Path From Multiple Sources]

Similar to Treasure Island

Given 2D Matrix
Multiple Starting Points 'S'. Multiple End Points 'E' and dead blocks 'D' and '1's you can walk through.

We can start from any 'S' point and can end at any 'E' point

Find the shortest distance from any starting point to any end point.


$ put all starting points into a queue and starts BFS


```java
// https://leetcode.com/discuss/interview-question/356150
public class Main {
    
    static int[][] dirs = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};

    public static int minDist(char[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        for (int i =0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 'S') {
                    queue.offer(new int[]{i, j});
                    grid[i][j] = 'D'; // mark as visited
                }
            }
        }
        int step = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            while(size-- > 0) {
                int[] cur = queue.poll();
                for (int[] dir : dirs) {
                    int nr = cur[0] + dir[0], nc = cur[1] + dir[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] != 'D') {
                        if (grid[nr][nc] == 'E') {
                            return step + 1;
                        }
                        grid[nr][nc] = 'D';
                        queue.offer(new int[] {nr, nc});
                    }
                }
            }
            step++;
        }
        return -1;
        
    }
    

    public static void main(String[] args) {
        char[][] grid = {
            {'S', 'D', '1'},
            {'1', 'E', '1'},
            {'S', 'E', '1'}}; 
        test(minDist(grid), 1);
        
        char[][] grid2 = {
            {'S', 'S', '1'},
            {'1', 'D', 'E'},
            {'E', '1', '1'}}; 
        test(minDist(grid2), 2);
        
        char[][] grid3 = {
            {'S', 'D', '1', 'D', 'E'},
            {'1', 'D', '1', 'D', '1'},
            {'1', '1', '1', '1', '1'},
            {'1', 'D', '1', 'D', '1'},
            {'S', 'D', '1', 'D', 'E'}}; 
        test(minDist(grid3), 8);

        char[][] grid4 = {
            {'S', 'D', '1', 'D', 'E'},
            {'1', 'D', '1', 'D', '1'},
            {'1', 'D', '1', '1', '1'},
            {'1', 'D', '1', 'D', '1'},
            {'S', 'D', '1', 'D', 'E'}}; 
        test(minDist(grid4), -1);
    }
    
    private static void test(int actual, int expected) {
        if (actual == expected) {
            System.out.println("PASSED!");
        } else {
            System.out.println(String.format("FAILED! Expected: %d, but got: %d", expected, actual));
        }
    }
}
```



[Two Sum]
```

         2SUM
        /    \
    HashMap  Sort
             3Sum..
      |        |
    dup =     < or <= 
 re



```

[Find Pair With Given Sum (a.k.a. Sort Center)]

> ref, implemented in the paygroud

```java
// "static void main" must be defined in a public class.
public class Main {
    public static void main(String[] args) {
	int[] nums1 = {1, 10, 25, 35, 60};
	int target1 = 90;
	System.out.println(Arrays.toString(find2Sum(nums1, target1-30)));
	int[] nums2 = {20, 50, 40, 25, 30, 10};
	int target2 = 90;
	System.out.println(Arrays.toString(find2Sum(nums2, target2-30)));
	int[] nums3 = {50, 20, 10, 40, 25, 30};
	int target3 = 90;
	System.out.println(Arrays.toString(find2Sum(nums3, target3-30)));
}

private static int[] find2Sum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        int[] res = new int[]{-1, -1};
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(target - nums[i])) {
                if (res[0] == -1 || Math.max(nums[res[0]], nums[res[1]]) < Math.max(nums[map.get(target - nums[i])], nums[i])) {
                    res[0] = map.get(target - nums[i]);
                    res[1] = i;
                }
                    
            }
            map.put(nums[i], i);
        }
    return res;
    }
    
}



```


[Find Pair With Ma Appeal Sum]
said to be a onsite question

```
Find pair with maximum Appeal value

Input: Array
Output: index [i, j] (i == j Allowed) with maximum Appeal
Appeal = A[i] + A[j] + abs(i - j);

Example 1:

index ;  0  1   2
input : [1, 3, -1]
output: [1, 1]
explanation: A[1] + A[1] + abs(0) = 3 + 3 + 0 = 6


Example 2:

index ;   0  1  2  3  4  5  6
input  : [1, 6, 1, 1, 1, 1, 7]
output : [1, 6]


```

> ref
``` 
  A[i] +A[j] + abs(i-j)
= A[i] +A[j] +(i-j) = (A[i]+i) + (A[j]-j)
= A[i] +A[j] - (i-j) = (A[i]-i) + (A[j]+j)
Since we are allowed to have same i=j, so just find the max value of each (A[i]-i), (A[i]+i).
```
```java
public int[] maxAppealPair(int[] arr) {
    if (arr == null || arr.length == 0) return new int[] {-1, -1};
    int max1 = Integer.MIN_VALUE, max2 = Integr.MIN_VALUE;
    int m1 = -1, m2 = -1;
    for (int i = 0; i< arr.length; i++) {
        int cur1 = arr[i]+i;
        int cur2 = arr[i]-i;

        if(cur1 > max1) {
            max1 = curr1;
            m1 = i;
        }
        if (cur2 > max2) {
            max2 = cur2;
            m2 = i;
        }
    }
    return new int[]{m1, m2};
}
```




$ what should we check at each start / end

$ what can be skipped

> ref, I think this is the easier way

A[i] + A[j] + abs(i - j)
= A[i] + A[j] + (i - j) ( i >= j) = A[i] + i + A[j] - j
or
= A[i] + A[j] + (j - i) (i < j)   = A[i] - i + A[j] + j


so the problem is : for each t, we need to know
-----i----- t -----j----
A[i] - i       A[j] + j

algs:
we can two pass
first get all A[i] - i for i in 0 ... n-1
second pass   A[i] + i for i in n-1...0

Then combine, one pass

for now it allows i == j, if i != j we have to check diffent possibilities

```
                     0  1  2
                    [1, 3, 1]
            A[i]-i   1  2  -1
            max      1  2   2
            A[i]+i   1  4   3
        max(reverse) 4  4   3

sum(i==j allowed)    5  6   5
```

> solution, proposed

```java
// "static void main" must be defined in a public class.
//https://leetcode.com/discuss/interview-question/355698/amazon-oa-2019-find-pair-with-max-appeal-sum/323219
public class Main {
    public static void main(String[] args) {
        
        //int[] a = new int[]{1, 3, -1}; // ans: [1, 1]
        //int[] a = new int[]{1, 6, 1, 1, 1, 1, 7}; // ans: [1, 6]
        int[] a = new int[]{6, 2, 7, 4, 4, 1, 6}; // ans: [0, 6]
        int[] pair = maxAppealVal(a);
        System.out.println(pair[0]+ " "+pair[1]);
    }
    
    
    //O(n) time complexity
    //O(1) space
    private static int[] maxAppealVal(int[] arr) {
        int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE;
        int m1 = -1, m2 = -1;
        for (int i = 0; i < arr.length; i++) {
            int cur1 = arr[i] - i; // sequence matter, compare arr[i] - i before arr[i] + i
            int cur2 = arr[i] + i;
            if (cur1 > max1) {
                max1 = cur1;
                m1 = i;
            }
            if (cur2 > max2) {
                max2 = cur2;
                m2 = i;
            }
        }
        return new int[]{m1, m2};
    }
}
```

[Min Cost to Connect All Nodes]

> MST


$ related question

[1135] Connecting Cities With Minimum Cost

> ref, Kruskal's algrithm

1. sort edges to non-descresing order
2. pick the smallest cost edge that does not form a cycle
3. repeat until MST is formed and every node is connected

Implemented Union-Find with Path Compression

> solution

```java
class Solution {
    
    int[] id;
    int n;
    
    public int minimumCost(int N, int[][] connections) {
        n = N;
        id = new int[N + 1]; // for index convinence and won't use id[0], only use [1..N]
        for (int i = 0; i <= N; i++) id[i] = i; // init to self component
        Arrays.sort(connections, (e1, e2) -> (e1[2] - e2[2]));
        int res = 0;
        for (int[] e : connections) {
            if (find(e[0]) != find(e[1])) {
                res += e[2];
                union(e[0], e[1]);
            }
        }
        return (n == 1 ? res : -1);
    }
    
    private int find(int i) {
        while(i != id[i]) {
            id[i] = id[id[i]]; // path compression
            i = id[i];
        }
        return i;
    }
    
    private void union(int i, int j) {
        int pi = find(i);
        int pj = find(j);
        if (pi != pj) {
            id[pi] = pj;
            n--;
        }
    }
}
```


> ref
```java
class Solution {
    
    int[] parent;
    int n;
    
    private void union(int x, int y) {
        int px = find(x);
        int py = find(y);
        
        if (px != py) {
            parent[px] = py;
            n--;
        }
    }
    
    private int find(int x) {
        if (parent[x] == x) {
            return parent[x];
        }
        parent[x] = find(parent[x]); // path compression
        return parent[x];
    }
    
    public int minimumCost(int N, int[][] connections) {
        parent = new int[N + 1];
        n = N;
        for (int i = 0; i <= N; i++) {
            parent[i] = i;
        }
        
        Arrays.sort(connections, (a, b) -> (a[2] - b[2]));
        
        int res = 0;
        
        for (int[] c : connections) {
            int x = c[0], y = c[1];
            if (find(x) != find(y)) {
                res += c[2];
                union(x, y);
            }
        }
        
        return n == 1 ? res : -1;
    }
}
```

> ref root with path compression 
```java
public int root(int i) {
    while (i != id[i]) {
        id[i] = id[id[i]];
        i = id[i];
    }
    return i;
}
```

> ref union
```java
private void union(int x, int y) {
    int px = find(x);
    int py = find(y);
    if (px != py) {
        id[px] = py;
        n--;
    }
}
```




[Min Cost to Repair Edges]

[Min Cost to Connect All Nodes (a.k.a. Min Cost to Add New Roads)]

> Apply Kruskal's algorithm: Just take existing edges to have 0 cost and broken edges have their given cost.
And find minimum spanning tree cost will be the answer.




[Substring of size K with K distinct chars]
```
Example 1
input : s = "abcabc" k = 3
output: ["abc", "bca", "cab"]
```
> solution
```JAVA
public class Main {
    
    public static List<String> kSubstring(String s, int k) {
        Set<String> res = new HashSet<>();
        Set<Character> set = new HashSet<>();
        int i = 0;
        for (int j = 0; j < s.length(); j++) {
            while (set.contains(s.charAt(j))) {
                set.remove(s.charAt(i++));
            }
            set.add(s.charAt(j));
            if (j - i + 1 == k) {
                res.add(s.substring(i, j + 1));
                set.remove(s.charAt(i++));
            }
        }
        return new ArrayList<String>(res);
    }
    
    public static void main(String[] args) {
        System.out.println(kSubstring("awaglknagawunagwkwagl", 4));
        Set<String> res = new HashSet(kSubstring("awaglknagawunagwkwagl", 4));
        
        String[] ans = {"wagl", "aglk", "glkn", "lkna", "knag", "gawu", "awun", "wuna", "unag", "nagw", "agwk", "kwag"};
        System.out.println(res.size() + " " + ans.length);
        for (String s : ans)
            if (!res.contains(s))
                System.out.println("false");
        System.out.println("TRUE");
        // ans : ["wagl", "aglk", "glkn", "lkna", "knag", "gawu", "awun", "wuna", "unag", "nagw", "agwk", "kwag"]
    }
}
```


$ related question
[1100] Find K-Length Substring With No Repeated Characters



> solution
```java
class Solution {
    public int numKLenSubstrNoRepeats(String S, int K) {
        Set<Character> set = new HashSet<>();
        int res = 0;
        int i = 0;
        for (int j = 0; j < S.length(); j++) {
            while (set.contains(S.charAt(j))) {
                set.remove(S.charAt(i++));
            }
            set.add(S.charAt(j));
            if (j - i + 1 == K) {
                res++;
                set.remove(S.charAt(i++));
            }
        }
        return res;
    }
}
```

> ref, sliding window
```java
class Solution {
    public int numKLenSubstrNoRepeats(String S, int K) {
        int ans = 0;
        Set<Character> set = new HashSet<>();
        int i = 0;

        for (int j = 0; j < S.length(); j++) {
            while (set.contains(S.charAt(j)))
                set.remove(S.charAt(i++));
        } //  find none-dup string at end j := [0..n-1]
        set.add(S.charAt(j)); // at one unqiue char
        if (j - i + 1 == K) {
            ans++;
            set.remove(S.charAt(i++)); // new lo
        }
    }
}
```


[Substring with exactly K distinct chars]

Given a string s and an int k, return an int representing the number of substrings (not unique) of s with exactly k distinct characters. If the given string doesn't have k distinct characters, return 0.

$ related 

992. Subarrays with K Different Integers

```JAVA
class Solution {
    public int subarraysWithKDistinct(int[] A, int K) {
        return atMost(A, K) - atMost(A, K - 1);
    }
    
    private int atMost(int[] A, int K) {
        int i = 0, res = 0;
        Map<Integer, Integer> map = new HashMap<>();
        for (int j = 0; j < A.length; j++) {
            if (map.getOrDefault(A[j], 0) == 0) K--;
            map.put(A[j], map.getOrDefault(A[j], 0) + 1);
            while (K < 0) {
                map.put(A[i], map.get(A[i]) - 1);
                if (map.get(A[i]) == 0) K++;
                i++;
            }
            res += j - i + 1;
        }
        return res;
    }
}
```



> ref
```java
public int subarrayWithDistinct(int[] A, int K) {
    return atMost(A, K) - atMost(A, K - 1);
}

private int atMost(int[] A, int K) {
    int i = 0, res = 0;
    Map<Integer, Integer> count = new HashMap<>();
    for (int j = 0; j < A.length; j++) {
        if (count.getOrDefault(A[j], 0) == 0) K--; // find one distinct, place decreased by 1
        count.put(A[j], count.getOrDefault(A[j], 0) + 1);
        while(K < 0) {
            count.put(A[i], count.get(A[i]) - 1);
            if (count.get(A[i]) == 0) K++; // place back 1
            i++;
        }
        res += j - i + 1; // end at j, start i..j inclusive
    }
    return res;
}
```

[763] Partition Labels

> solution v2
```java
class Solution {
    public List<Integer> partitionLabels(String S) {
        // save right most index of each character is S
        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < S.length(); i++)
            map.put(S.charAt(i), i);
        int start = 0, end = 0;
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < S.length(); i++) {
            end = Math.max(end, map.get(S.charAt(i)));
            if (i == end) {
                res.add(end - start + 1);
                start = end + 1;
            }
        }
        return res;
        
    }
}
```



> solution v1
```java
class Solution {
    public List<Integer> partitionLabels(String S) {
        HashMap<Character, Integer> map = new HashMap<>(); // rightmost index of a character
        for (int i = 0; i < S.length(); i++) {
            map.put(S.charAt(i), i);
        }
        int start = 0, end = 0;
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < S.length(); i++) {
            end = Math.max(end, map.get(S.charAt(i)));
            if (i == end) {
                res.add(end -start + 1);
                start = end + 1;
            }
        }
        return res;
    }
}
```

[Roll Dice]

> ref
```java
/**
 * @author ekhoja
 */
public class RollDice {

    private int distance(int pip1, int pip2){

        if(pip1 == pip2) return 0;
        if(pip1 + pip2 == 7 ){
            return 2;
        }
        return  1;
    }

    private int minMoves(int[] moves){
        int minMoves = Integer.MAX_VALUE;
        int currentMoves = 0;
        int i = 1;

        while(i < 7){
            for(int move : moves) {
                currentMoves += distance(move, i);
            }
            minMoves =  Math.min(minMoves, currentMoves);
            currentMoves = 0;
            i++;
        }

        return minMoves;
    }

    public static void main(String[] args) {
        System.out.println(new RollDice().minMoves(new int[]{1,2,3}));
        System.out.println(new RollDice().minMoves(new int[]{1,1,6}));
        System.out.println(new RollDice().minMoves(new int[]{1,6,2,3}));

    }

}
```

[572] Subtree of Another Tree

> solution
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSubtree(TreeNode s, TreeNode t) {
        if (s == null) return false;
        if (isSame(s, t)) return true;
        return isSubtree(s.left, t) || isSubtree(s.right, t);
    }
    
    private boolean isSame(TreeNode s, TreeNode t) {
        if (s == null && t == null) return true;
        if (s == null || t == null) return false;
        if (s.val != t.val) return false;
        return isSame(s.left, t.left) && isSame(s.right, t.right);
    }
}
```


> ref
```java
public class Solution {
    public boolean isSubtree(TreeNode s, TreeNode t) {
        if (s == null) return false;
        if (isSame(s, t)) return true;
        return isSubtree(s.left, t) || isSubtree(s.right, t);
    }
    
    private boolean isSame(TreeNode s, TreeNode t) {
        if (s == null && t == null) return true;
        if (s == null || t == null) return false;
        
        if (s.val != t.val) return false;
        
        return isSame(s.left, t.left) && isSame(s.right, t.right);
    }
}
```


[Subtree with Maximum Average]

> ref
```java
class Solution {
    double max = Integer.MIN_VALUE;
    TreeNode maxNode = null;

    public TreeNode maximumAverageSubtree(TreeNode root) {
        if (root == null) return null;
        helper(root);
        return maxNode;
    }

    private double[] helper(TreeNode root) {
        if (root == null) return new double[]{0, 0};

        double curTotal = root.val;
        double count = 1;
        for (TreeNode child : root.children) {
            double[] cur = helper(child);
            curTotal += cur[0];
            count += cur[1];
        }

        double avg = curTotal / count;
        if (count > 1 && avg > max) {
            max = avg;
            maxNode = root;
        }
        return new double[] {curTotal, count};
    }
}
```

$ related question

[1120] Maximum Average Subtree

> solution
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    double max = Integer.MIN_VALUE;
    public double maximumAverageSubtree(TreeNode root) {
        helper(root);
        return max;
    }
    
    private int[] helper(TreeNode root) {
        if (root == null) return new int[]{0, 0};
        int[] left = helper(root.left);
        int[] right = helper(root.right);
        int sum = root.val + left[0] + right[0];
        int size = 1 + left[1] + right[1];
        max = Math.max(max, (double) sum / size);
        return new int[] {sum, size};
        
    }
}
```

> ref
```python
    def maximumAverageSubtree(self, root):
        self.res = 0
        def helper(root):
            if not root: return [0, 0.0]
            n1, s1 = helper(root.left)
            n2, s2 = helper(root.right)
            n = n1 + n2 + 1
            s = s1 + s2 + root.val
            self.res = max(self.res, s / n)
            return [n, s]
        helper(root)
        return self.res
```

[Longest string without 3 consecutive characters]

```
Example 1:
input : A = 1, B = 1, C = 6
output: "ccbccacc"
```

> ref, typed
```java
class Solution {
    public String generateString(Map<Character, Integer> map) {
        PriorityQueue<Map.Entry<Character, Integer>> pq = new PrioriyQueue<>((a, b) -> (b.getValue() - a.getValue()));
        int cnt = 0;
        for (Map.Entry<Character, Integer> e : map.entrySet()) {
            cnt += e.getValue();
            pq.offer(e);
        }
        Map.Entry<Character, Integer> onHold = null;
        StringBuilder res = new StringBuilder();
        while (!pq.isEmpty()) {
            Map.Entry<Character, Integer> current = pq.poll();
            res.append(current.getKey());
            if (onHold != null) {
                pq.offer(onHold);
                onHold= null;
            }
            int curValue = cur.getValue();
            if (curValue > 1) {
                cur.setValue(curValue - 1);
                // check if we need to hold this value
                if (sb.length() >= 2 && cur.getKey() == sb.charAt(sb.length()-2)) {
                    onHold = current;
                } else {
                    pq.offer(current);
                }
            }
        }
        return sb.length() == cnt ? sb.toString() : "";
    }
}
```
> ref 
```java
   public static String generateString(Map<Character, Integer> map) {
		PriorityQueue<Map.Entry<Character, Integer>> maxHeap = 
	            new PriorityQueue<Map.Entry<Character, Integer>>((a, b) -> b.getValue() - a.getValue());
	    
		int cnt = 0;
		for (Map.Entry<Character, Integer> e: map.entrySet()) {
			cnt += e.getValue();
			maxHeap.add(e);
		}
	    
	    // only one char can be on hold
	    Map.Entry<Character, Integer> onHold = null;
	    
	    StringBuilder sb = new StringBuilder();
	    
	    while (!maxHeap.isEmpty()) {
	    	Map.Entry<Character, Integer> cur = maxHeap.poll();
	    	sb.append(cur.getKey());
	    	
	    	if (onHold != null) {
	    		maxHeap.add(onHold);
	    		onHold = null;
	    	}
    		int curValue = cur.getValue();
    		if (curValue > 1) {
    			cur.setValue(curValue-1);
    			if (sb.length() >= 2 && cur.getKey() == sb.charAt(sb.length()-2)) { // on hold
	    			onHold = cur;
    			} else {  // add back to heap
    				maxHeap.add(cur);
    			}
    		}
	    
	    }
	    return sb.length() == cnt ? sb.toString(): "";
	}
```

$ Related Questions 
[358] Rearange String k Distance Apart


The greedy algorithm is that in each step, selct the char with highest remaining count if possible (if it's not in the waiting queue). A regular queue is used t freeze previous appeared char in the period of k

```
pq -> wait queue, hold k steps -> return to pq if still has

we hold the candidate after use for k steps

```

> solution
```java
class Solution {
    public String rearrangeString(String s, int k) {
        Map<Character, Integer> counter = new HashMap<>();
        for (char ch : s.toCharArray()) 
            counter.put(ch, counter.getOrDefault(ch, 0) + 1);
        PriorityQueue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>((a, b) -> (b.getValue() - a.getValue()));
        pq.addAll(counter.entrySet());
        Queue<Map.Entry<Character, Integer>> waitQueue = new LinkedList<>();
        StringBuilder res = new StringBuilder();
        while (!pq.isEmpty()) { // while we still have candidate
            Map.Entry<Character, Integer> current = pq.poll();
            res.append(current.getKey());
            current.setValue(current.getValue() - 1);
            waitQueue.offer(current); // freeze this character
            if (waitQueue.size() < k)
                continue;
            Map.Entry<Character, Integer> front = waitQueue.poll();
            if (front.getValue() > 0)
                pq.offer(front);
        }
        return (res.length() == s.length() ? res.toString() : "");
    }
}
```

> we can also arrange in dictionary order, but could be slower         PriorityQueue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>((a, b) -> (b.getValue() - a.getValue() == 0 ? a.getKey().compareTo(b.getKey()) : b.getValue() - a.getValue()));


> ref
```java
public class Solution {
    public String rearrangeString(String str, int k) {
        
        StringBuilder rearranged = new StringBuilder();
        //count frequency of each char
        Map<Character, Integer> map = new HashMap<>();
        for (char c : str.toCharArray()) {
            if (!map.containsKey(c)) {
                map.put(c, 0);
            }
            map.put(c, map.get(c) + 1);
        }
        
        //construct a max heap using self-defined comparator, which holds all Map entries, Java is quite verbose
        Queue<Map.Entry<Character, Integer>> maxHeap = new PriorityQueue<>(new Comparator<Map.Entry<Character, Integer>>() {
            public int compare(Map.Entry<Character, Integer> entry1, Map.Entry<Character, Integer> entry2) {
                return entry2.getValue() - entry1.getValue();
            }
        });
        
        Queue<Map.Entry<Character, Integer>> waitQueue = new LinkedList<>();
        maxHeap.addAll(map.entrySet());
        
        while (!maxHeap.isEmpty()) {
            
            Map.Entry<Character, Integer> current = maxHeap.poll();
            rearranged.append(current.getKey());
            current.setValue(current.getValue() - 1);
            waitQueue.offer(current);
            
            if (waitQueue.size() < k) { // intial k-1 chars, waitQueue not full yet
                continue;
            }
            // release from waitQueue if char is already k apart
            Map.Entry<Character, Integer> front = waitQueue.poll();
            //note that char with 0 count still needs to be placed in waitQueue as a place holder
            if (front.getValue() > 0) {
                maxHeap.offer(front);
            }
        }
        
        return rearranged.length() == str.length() ? rearranged.toString() : "";
    }
    
}
```




> ref, typed myself
```java
public class Solution {
    public String rearrangeString(String str, int k) {
        StringBuilder rearranged = new StringBuilder();
        Map<Character, Integer> map = new HashMap<>();
        for (char c : str.toCharArray()) {
            if (!map.containsKey(c))
                map.put(c, 0);
            map.put(c, map.get(c) + 1);
        }

        Queue<Map.Enrty<Character, Integer>> maxHeap = new PriorityQueue<>(new Comparator<map.Enrty<Character, Integer>>() {
            public int compare(Map.Entry<Character, Integer> entry1, Map.Entry<Character, Integer> entry2) {
                return entry2.getValue() - entry1.getValue();
            }
        });

        Queue<Map.Entry<Character, Integer>> waitQueue = new LinkedList<>();
        maxHeap.addAll(map.entrySet());

        while (!maxHeap.isEmpty()) {
            // while there are still candidates
            Map.Entry<Character, Ineger>  current = maxHeap.poll();
            rearranged.append(current,getKey());
            current.setValue(current.getValue() - 1);
            waitQueue.offer(current); // freeze this character
            if (waitQueue.size() < k) {
                continue; // keep adding and freeze until there is k freezed
            }
            Map.Entry<Character, Integer> front = waitQueue.poll();
            if (front.getValue() > 0) {
                maxHeap.offer(front);
            }
        }
        // missing characters are trapped in the waitQueue
        return rearranged.length() == str.length() ? rearranged.toString() : "";

    }
}
```

[Longest string made up of only vowels]

```
you are given with a string. Your task is to remove atmost two substrings of any length from the given string such that the remaining string contains vowels('a', 'e', 'i', 'o', 'u') only. Your aim is the maximize the length of the remaining string. Output the lenght of remaining string after removal of at most two substrings.

Example
input : input            i np u t
output: 2                1    1  

input : earthproblem     ea rthpr o bl e m
output: 3                2        1    1  


algs: 

v nnnn v nnnn v : two cut
v nnv nn v nn v : if two cut, find longest v in between

v nnnn v nnnnn  : 
v nvv nn vv nn  : 

padding 0 length vowel at each two end if not vowel
```

> solution
```java
// "static void main" must be defined in a public class.
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        //String s = "input";
        //String s = "earthproblem";
        //String s = "letsgosomewhere";
        String s = "p";
        int res = maxVowelsLen(s);
        System.out.println("input : " + s);
        System.out.println("output : " + res);
    }
    
    private static int maxVowelsLen(String s) {
        Set<Character> vowels = new HashSet<>();
        vowels.add('a');
        vowels.add('e');
        vowels.add('i');
        vowels.add('o');
        vowels.add('u');
        int n = s.length();
        LinkedList<Integer> list = new LinkedList<>();
        int len = 0;
        char[] arr = s.toCharArray();
        for (int i = 0; i < n; i++) {
            if (!vowels.contains(arr[i])) {
                if (len > 0) list.add(len);
                len = 0;
            } else {
                len++;
            }
        }
        if (len > 0) list.add(len);
        if (!vowels.contains(arr[0])) list.addFirst(0);
        if (!vowels.contains(arr[n-1])) list.addLast(0);
        int max = -1;
        for (int i = 1; i < list.size() - 1; i++)
            max = Math.max(max, list.get(i));
        System.out.println(list);
        if (list.size() < 3) {
            int sum = 0;
            for (int num : list) sum += num;
            return sum;
        } else {
            return list.get(0) + list.get(list.size()-1) + max;    
        }
        
        
    }
}
```

> ref
```py
def longestVowelsOnlySubstring(S):
    temp, aux, vowels = 0, [], set('aeiou')
    # Count the length of each vowel substring
    for c in S + 'z': # acrually I don't think this is a good idea
        if c in vowels:
            temp += 1
        elif temp:
            aux.append(temp)
            temp = 0
    # If the first letter is not vowel, you must cut the head
    if S[0] not in vowels: aux = [0] + aux
    # If the last letter is not vowel, you must cut the tail
    if S[-1] not in vowels: aux = aux + [0]
    # Max length = max head + max tail + max middle
    return aux[0] + aux[-1] + max(aux[1:-1] if len(aux) >= 3 else sum(aux))
```



[updated][0902] Amazon Online Assessment Questions

[Reorder Log Files ⭐⭐⭐] [leetcode](https://leetcode.com/problems/reorder-log-files/submissions/)
>solutiom
```java
class Solution {
    public String[] reorderLogFiles(String[] logs) {
        Arrays.sort(logs, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                String[] split1 = s1.split(" ", 2);
                String[] split2 = s2.split(" ", 2);
                boolean isDigit1 = Character.isDigit(split1[1].charAt(0));
                boolean isDigit2 = Character.isDigit(split2[1].charAt(0));
                if (isDigit1 && isDigit2) return 0;
                if (isDigit1 || isDigit2) return (isDigit1 ? 1 : -1);
                int cmp = split1[1].compareTo(split2[1]);
                return (cmp == 0 ? split1[0].compareTo(split2[0]) : cmp);
            }
        });
        return logs;
    }
}
```


[Optimal Utilization ⭐⭐⭐]

> solution  [playground](https://leetcode.com/playground/ENrxRDJ7)
```java
// "static void main" must be defined in a public class.
/*


Input:
a = [[1, 2], [2, 4], [3, 6]]
b = [[1, 2]]
target = 7

Output: [[2, 1]]

Explanation:
There are only three combinations [1, 1], [2, 1], and [3, 1], which have a total sum of 4, 6 and 8, respectively.
Since 6 is the largest sum that does not exceed 7, [2, 1] is the optimal pair.

Input:
a = [[1, 3], [2, 5], [3, 7], [4, 10]]
b = [[1, 2], [2, 3], [3, 4], [4, 5]]
target = 10

Output: [[2, 4], [3, 2]]

*/
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        List<int[]> a = new ArrayList<>();List<int[]> b = new ArrayList<>();
        //a.add(new int[]{1, 3});a.add(new int[]{2, 5});a.add(new int[]{3, 7});a.add(new int[]{4, 10});
        //b.add(new int[]{1, 2});b.add(new int[]{2, 3});b.add(new int[]{3, 4});b.add(new int[]{4, 5});
        //List<int[]> res = getPairs(a, b, 10);
        a.add(new int[]{1, 2});a.add(new int[]{2, 4});a.add(new int[]{3, 6});
        b.add(new int[]{1, 2});
        List<int[]> res = getPairs(a, b, 7);
        for(int[] r : res) System.out.println(r[0] + " " + r[1]);
    }
    
    private static List<int[]> getPairs(List<int[]> a, List<int[]> b, int target) {
        List<int[]> res = new ArrayList<>();
        Collections.sort(a, (x, y) -> (x[1] - y[1]));
        Collections.sort(b, (x, y) -> (x[1] - y[1]));
        int m = a.size(), n = b.size();
        int i = 0, j = n - 1;
        int max = Integer.MIN_VALUE;
        while (i < m && j >= 0) {
            int sum = a.get(i)[1] + b.get(j)[1];
            if (sum > target) {
                j--;
            } else {
                if (sum >= max) {
                    if (sum > max) {
                        max = sum;
                        res.clear();
                    }
                    res.add(new int[]{a.get(i)[0], b.get(j)[0]});
                    int index = j - 1;
                    while (index >= 0 && b.get(index)[1] == b.get(j)[1]) 
                        res.add(new int[]{a.get(i)[0], b.get(index--)[0]});
                }
                i++;
            }
        }
        return res;
    }
}
```



> ref [popeye](https://leetcode.com/popeye_the_sailort/)
```java
    private List<int[]> getPairs(List<int[]> a, List<int[]> b, int target) {
        Collections.sort(a, (i,j) -> i[1] - j[1]);
        Collections.sort(b, (i,j) -> i[1] - j[1]);
        List<int[]> result = new ArrayList<>();
        int max = Integer.MIN_VALUE;
        int m = a.size();
        int n = b.size();
        int i =0;
        int j =n-1;
        while(i<m && j >= 0) {
            int sum = a.get(i)[1] + b.get(j)[1];
            if(sum > target) {
                 --j;
            } else {
                if(max <= sum) {
                    if(max < sum) {
                        max = sum;
                        result.clear();
                    }
                    result.add(new int[]{a.get(i)[0], b.get(j)[0]});
                    int index = j-1;
                    while(index >=0 && b.get(index)[1] == b.get(index+1)[1]) {
                         result.add(new int[]{a.get(i)[0], b.get(index--)[0]});
                    }
                }
                ++i;
            }
        }
        return result;
    } 
```

```
Example
Input:
a = [[1, 2], [2, 4], [3, 6]]
b = [[1, 2]]
target = 7

Output: [[2, 1]]

Explanation:
There are only three combinations [1, 1], [2, 1], and [3, 1], which have a total sum of 4, 6 and 8, respectively.
Since 6 is the largest sum that does not exceed 7, [2, 1] is the optimal pair.


Input:
a = [[1, 3], [2, 5], [3, 7], [4, 10]]
b = [[1, 2], [2, 3], [3, 4], [4, 5]]
target = 10

Output: [[2, 4], [3, 2]]

Explanation:
There are two pairs possible. Element with id = 2 from the list `a` has a value 5, and element with id = 4 from the list `b` also has a value 5.
Combined, they add up to 10. Similarily, element with id = 3 from `a` has a value 7, and element with id = 2 from `b` has a value 3.
These also add up to 10. Therefore, the optimal pairs are [2, 4] and [3, 2].
```

[Min Cost to Connect Ropes / Min Time to Merge Files ⭐⭐⭐]
[leetcode 1167](https://leetcode.com/problems/minimum-cost-to-connect-sticks/)
solution
```java
class Solution {
    public int connectSticks(int[] sticks) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int s : sticks) pq.offer(s);
        int sum = 0;
         while (pq.size() > 1) {
             int t = pq.poll() + pq.poll();
             sum += t;
             pq.offer(t);
         }
        return sum;
    }
}
```


