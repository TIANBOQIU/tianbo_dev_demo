package ch3;

public class ConstantsInMethod {
    public static void main(String[] args) {
        // use keyword final to denote a constant
        final double CM_PER_INCH = 2.54;
        double paperWidth = 8.5;
        double paperHeight = 11;
        System.out.println("Paper size in centimeters: "
                + paperWidth * CM_PER_INCH + " by " + paperHeight * CM_PER_INCH);
        System.out.println("We can use other class's public class constant: " + ClassConstant.CM_PER_INCH);
    }
}
