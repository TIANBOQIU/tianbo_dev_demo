package ch3;

public class ClassConstant {
    // set up a class constant with the keyword static final, so it's available to multiple method
    // in a single class
    public static final double CM_PER_INCH = 2.54;
    public static void main(String[] args) {
        double paperWidth = 8.5;
        double paperHeight = 11;
        System.out.println("Paper size in centimemters: "
                + paperWidth * CM_PER_INCH + " by " + paperHeight * CM_PER_INCH);
    }
}
