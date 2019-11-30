[decode string SAP] [decode prime string]

https://leetcode.com/playground/A3SkRwJ9

```java
// "static void main" must be defined in a public class.
/*
Input Two lines with the first line contains an integer N such that all prime numbers are smaller than N and the next line contains an encoded message with 25 integers seperated by a space.

Output
A dcoded message with 26 letters in uppercase.


input:
200
"26123 11929 12877 17767 14279 20567 8321 9593 11041 5429 7387 5561 4757 9017 12827 15049 15943 19153 24523 22879 17201 19673 26549 13483 10961"
output:
WSEULOTAYBGFCDNIRKXPVJZQHM
*/


public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        String input = "26123 11929 12877 17767 14279 20567 8321 9593 11041 5429 7387 5561 4757 9017 12827 15049 15943 19153 24523 22879 17201 19673 26549 13483 10961";
        int N = 200;
        String[] ss = input.split(" ");
        System.out.println("length of input ss : " + ss.length);
        int[] nums = new int[ss.length];
        for (int i = 0; i < nums.length; i++)
            nums[i] = Integer.parseInt(ss[i]);
        Set<Integer> not = new HashSet<>(), primes = new HashSet<>();
        for (int i = 2; i < N; i++) {
            if (!not.contains(i)) primes.add(i);
            for (int j = 2; i * j < N; j++) not.add(i * j);
        }
        /*
        System.out.println("Primes under " + N);
        for (int n : primes) System.out.print(n + " ");
        System.out.println();
        */
        /*
        for (int n : nums) {
            boolean valid = false;
            for (int p : primes)
                if (n % p == 0) valid = true;
            System.out.println("checking input : " + n + " -> " + (valid? "true" : "false"));
        }
        */
        Set<Integer> candidates = new HashSet<>();
        for (int p : primes)
            if (nums[0] % p == 0)
                candidates.add(p);
        /*
        for (int n : candidates) System.out.println(n + " ");
        */
        List<Integer> res = new ArrayList<>();
        for (int n : candidates)
            if (backtrack(nums, 0, n, res))
                break;
        for (int n : res) System.out.print(n + " ");
        System.out.println();
        //System.out.println(nums.length);
        HashMap<Integer, Character> map = new HashMap<>();
        
        //for (int p : primes) map.put(p, (char)ch++);
        
        // reconstruct
        for (int p : primes) System.out.print(p + " ");
        /*
        List<Integer> pp = new ArrayList<>(primes);;
        Collections.sort(pp);
        for (int i = 0; i < 26; i++)
            map.put(pp.get(i), (char)('A' + 0));
        
        StringBuilder sb = new StringBuilder();
        for (int n : res) sb.append(map.get(n));
        String out = sb.toString();
        System.out.println(out); */
        List<Integer> pp = new ArrayList<>(res);
        Collections.sort(pp);
        for (int i = 0; i < 26; i++) {
            map.put(pp.get(i), (char)('A' + i));
        }
        StringBuilder sb = new StringBuilder();
        for (int n : res) sb.append(map.get(n));
        String out = sb.toString();
        
        System.out.println("# The Answer");
        System.out.println(out); 
        
    }
    
    
    public static boolean backtrack(int[] nums, int i, int start, List<Integer> res) {
        if (i == nums.length - 1) {
            if (nums[i] % start != 0) {
                res.remove(res.size() - 1);
                return false;
            } else {
                res.add(start);
                res.add(nums[i] / start);
                return true;
            }
        }
        if (nums[i] % start != 0) {
            res.remove(res.size() - 1);
            return false;
        }
        res.add(start);
        int next = nums[i] / start;
        return backtrack(nums, i + 1, next, res);
    }
}
```

[print matrix with pattern SAP OA]

https://leetcode.com/playground/ttiDCAQR
```java
// "static void main" must be defined in a public class.
/*
input:
n = 3
output:
3 3 3
3 1 3
3 2 3
3 3 3

input:
n = 4
output:
4 4 4 4
4 4 1 4
4 4 2 4
4 4 3 4
4 4 4 4
*/
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        print(3);
        print(4);
    }
    
    public static void print(int n) {
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print((i > 0 && j == n - 2 ? i : n));
                if (j != n - 1) System.out.print(" ");
            }
            System.out.println();
        }
    }
}
```


> q2

https://leetcode.com/playground/M2WDVtew

The rules are simple, everyone playing the game gets a random number in the range 1 to 9999 and in each round of the game the payers have to multiply theire number with the round number. The game stops when a player gets all the digits from 0 to 9 in all the rounds that have played combined and it's a bingo.

```java
// "static void main" must be defined in a public class.
/*
input: 7892     // a number from 1 to 9999
output: 5

Explaination:
7892 * 1 = 7892
7892 * 2 = 15748
...
7892 * 5 = 39460 // then we get all 0 to 9, return this round which is 5
*/

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        int res = getBingo(7892);
        System.out.println(res);
    }
    
    public static int getBingo(int n) {
        int round = 1;
        Set<Integer> set = new HashSet<>();
        while (set.size() < 10) {
            int cur = n * round;
            while (cur > 0) {
                set.add(cur % 10);
                cur /= 10;
            }
            if (set.size() == 10) return round;
            else
                round++;
        }
        return round;
    }
    
    
}
```


