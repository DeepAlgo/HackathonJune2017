class Main {
  public static void main(String[] args) {
    sayHi(args[0]);
    System.exit(exitCode);
  }

  public static int exitCode;

  public static void sayHi(String name) {
    System.out.println("Hello " + name);
    exitCode = 0;
  }
}
