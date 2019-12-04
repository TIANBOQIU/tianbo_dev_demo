import java.util.ArrayList;

class Solution {

    static void main(String[] args) {
        String[] words = { "abc", "cba", "ab", "d" };
        Solution sol = new Solution();
        List<List<String>> res = sol.group(words);
        System.out.println(res.toString());

    }

    public List<List<String>> group(String[] words) {
        List<List<String>> res = new ArrayList<>();
        Map<String, List<String>> map = new HashMap<>();
        for (String s : words) {
            char[] arr = s.toCharArray();
            quickSort(arr);
            String key = String.valueOf(arr);
            if (!map.containsKey(key))
                map.put(key, new ArrayList<>());
            map.get(key).add(s);
        }
        for (String key : map.keySet()) {
            res.addAll(map.get(key));
        }
        return res;
    }

    public void quickSort(char[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    public void quickSort(char[] arr, int lo, int hi) {
        if (lo > hi)
            return;
        int i = partition(arr, 0, nums.length - 1);
        quickSort(arr, lo, i - 1);
        quickSort(arr, i + 1, hi);
    }

    public int partition(char[] arr, int lo, int hi) {
        int i = lo - 1;
        char pivot = arr[hi];
        for (int j = lo; j < hi; j++) {
            if (arr[j] < pivot)
                swap(arr, ++i, j);
        }
        sawp(nums, ++i, hi);
        return i;
    }

    public void swap(char[] arr, int i, int j) {
        char tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

}