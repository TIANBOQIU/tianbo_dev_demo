package ch3;

import java.util.Arrays;

public class ArraysTest {
    public static void main(String[] args) {
        int[] nums = {1, 2, 2, 4, 4, 6};
        int[] arr = Arrays.copyOf(nums, 3);
        int[] arr2 = Arrays.copyOfRange(nums,1, 4);
        System.out.println(Arrays.toString(arr));
        System.out.println(Arrays.toString(arr2));
        System.out.println(Arrays.binarySearch(nums, 3)); // returns -4
        System.out.println(Arrays.binarySearch(nums, 2)); // returns 2, the right most 2
        System.out.println(Arrays.binarySearch(nums, 4)); // return 4, the right most 4
    }
}
