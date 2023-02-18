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
