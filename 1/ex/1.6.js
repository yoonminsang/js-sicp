// 1.6
// 다음과 같이 삼항연산자대신 conditional이라는 함수를 사용해보았다.
// 사용해보니 maximum call stack error가 뜬다.
// TODO

function conditional(predicate, then_clause, else_clause) {
  return predicate ? then_clause : else_clause;
}
function sqrt_iter(guess, x) {
  return conditional(
    is_good_enough(guess, x),
    guess,
    sqrt_iter(improve(guess, x), x)
  );
}

function is_good_enough(guess, x) {
  return Math.abs(square(guess) - x) < 0.001;
}

function square(x) {
  return x ** 2;
}
