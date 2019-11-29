package ch3;

import java.util.Scanner;

/**
 * This program demonstrates console input. -L3.2
 * @version 1.10 2004-02-10
 * @author Cay Horstmann
 */
public class InputTest {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        // get first input
        System.out.print("What is your name? ");
        String name = in.nextLine();
        // get second input
        System.out.println("How old are you? ");
        int age = in.nextInt();

        // display out on console
        System.out.println("Hello, " + name + ". Next year, you'll be " + (age + 1));
    }
}
