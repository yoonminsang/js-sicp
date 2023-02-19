// 팩토리얼

// 선형재귀
function factorial(n) {
  return n === 1 ? 1 : n * factorial(n - 1);
}

// 선형 반복
function factorial(n) {
  function iter(product, counter, max_count) {
    return counter > max_count
      ? product
      : iter(counter * product, counter + 1, max_count);
  }
  return iter(1, 1, n);
}

// 피보나치수열

// 트리적 재귀
function fib(n) {
  return n === 0 ? 0 : n === 1 ? 1 : fib(n - 1) + fib(n - 2);
}

// 선형 반복
function fib(n) {
  function iter(a, b, count) {
    return count === 0 ? b : iter(a + b, a, count - 1);
  }
  return iter(1, 0, n);
}

// 예제: 잔돈 만들기 TODO

// 거듭제곱
// b^n=b*b^(n-1)

// 선형적 재귀
// 단계 수: Θ(n), 공간:Θ(n)
function expt(b, n) {
  return n === 0 ? 1 : b * expt(b, n - 1);
}

// 반복적 과정
// 단계 수: Θ(n), 공간:Θ(1)
function expt(b, n) {
  return expt_iter(b, n, 1);
}
function expt_iter(b, counter, product) {
  return counter === 0 ? product : expt_iter(b, counter - 1, b * product);
}

// 공간과 단계 수는 n의 증가에 따라 로그적으로 증가한다. 증가차수: Θ(logn)
function fast_expt(b, n) {
  return n === 0
    ? 1
    : is_even(n)
    ? square(fast_expt(b, n / 2))
    : b * fast_expt(b, n - 1);
}
function is_even(n) {
  return n % 2 === 0;
}
function square(x) {
  return x ** 2;
}

// 최대공약수

// 유클리드 호제법
// 단계 수는 관련된 정수들의 로그에 비례해서 증가한다.
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 소수판정

// 증가차수: Θ(root n)
function smallest_divisor(n) {
  return find_divisor(n, 2);
}
function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
    ? n
    : divides(test_divisor, n)
    ? test_divisor
    : find_divisor(n, test_divisor + 1);
}
function divides(a, b) {
  return b % a === 0;
}

function is_prime(n) {
  return n === smallest_divisor(n);
}

// 확률적 알고리즘 Θ(logn)
// 페르마 판정법
function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m;
}
function fermat_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a;
  }
  return try_it(1 + math_floor(math_random() * (n - 1)));
}
function fast_is_prime(n, times) {
  return times === 0;
}
