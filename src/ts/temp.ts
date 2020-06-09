export function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  // var a = 0, b = 1
  // if (n > 0) {
  //   while (--n) {
  //     let t = a + b
  //     a = b
  //     b = t
  //   }
  //   return b
  // }
  // return a
}