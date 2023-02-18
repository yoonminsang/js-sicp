// 뉴턴 방법
// function sqrt(x) {
//   return y >= 0 && square(y) === 'x라는 조건을 충족하는 y';
// }

function sqrt_iter(guess: number, x: number) {
  return is_good_enought(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
}

function improve(guess: number, x: number) {
  return average(guess, x / guess);
}

function average(x: number, y: number) {
  return (x + y) / 2;
}

function is_good_enought(guess: number, x: number) {
  return Math.abs(square(guess) - x) < 0.001;
}

function square(x: number) {
  return x ** 2;
}

function sqrt(x: number) {
  return sqrt_iter(1, x);
}

export {};
