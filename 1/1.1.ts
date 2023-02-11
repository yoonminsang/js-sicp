// 1.1
// 생략

// 1.2
(5 + 4 + (2 - (3 - (6 + 4 / 5)))) / (3 * (6 - 2) * (2 - 7));

// 1.3
// 세 개가 아니라 n개로 바꿔보자.
function ex(numbers: number[]) {
  return sumOfSquares(getNumberExceptMin(numbers));
}

function getNumberExceptMin(numbers: number[]) {
  return numbers.sort((a, b) => a - b).slice(1);
}

function sumOfSquares(numbers: number[]) {
  return numbers.reduce((acc, cur) => acc + square(cur), 0);
}

function square(x: number) {
  return x ** 2;
}

// 1.4
function plus(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
function a_plus_abs_b(a, b) {
  return (b >= 0 ? plus : minus)(a, b);
}
/**
 * 작동방식
 * b가 0보다큰 경우에는 plus라는 식이 평가(?)된다. 그리고 plus(a,b)라는 함수가 실행된다.
 * b가 0보다 작은 경우에는 minus라는 식이 평가(?)된다. 그리고 minus(a,b)라는 함수가 실행된다.
 *
 */

// 1.5
function p() {
  // 책에는 로그가 없지만 다음과 같이 로그를 찍어보면 이해하기 더 쉽다.
  console.log('p');
  return p();
}

function test(x, y) {
  // 책에는 로그가 없지만 다음과 같이 로그를 찍어보면 이해하기 더 쉽다.
  console.log('test');
  return x === 0 ? 0 : y;
}
test(0, p());
/**
 * 해석기의 평가 방식 파악
 *
 * p함수를 실행하면 무한히 p함수가 실행된다. 이걸 먼저 기억하자.
 *
 * 인수 우선 평가
 *   인자인 0과 p함수가 실행된다. 0은 이미 전개가 끝난 상태고 p를 실행하면 무한히 p함수가 실행된다.
 *   그래서 p함수가 무한히 실행되고 콜스택이 초과되어서 에러가 나고 test함수는 실행되지 않는다.
 *
 * 정상 순서 평가
 *   완전히 전개한 후 축약하기 때문에 p함수가 트리구조로 무한히 만들어진다. 그렇기 때문에 test함수와 p함수는 실행되지 않을것이다.
 */

// 더 나아가기
function asyncP() {
  console.log('p');
  setTimeout(() => asyncP());
}
asyncP();
/**
 * 다음과 같이 실행하면 어떻게 될까?
 * 놀랍게도(아니 당연하게도)
 */
