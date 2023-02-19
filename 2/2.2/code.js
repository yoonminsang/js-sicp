// ## 목록 표기법

// ### 목록 연산

// tail을 연달아 적용해서 목록의 요소들을 차례로 훑는다.
function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}

const squares = list(1, 4, 9, 16, 25);

list_ref(squares, 3);
16;

function length(items) {
  //   return is_null(items) ? 0 : 1 + length(tail(items));
  function length_iter(a, count) {
    return is_null(a) ? count : length_iter(tail(a), count + 1);
  }
  return length_iter(items, 0);
}

const odds = list(1, 3, 5, 7);

length(odds);
4;

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

append(squares, odds);
list(1, 4, 9, 16, 25, 1, 3, 5, 7);

append(odds, squares);
list(1, 3, 5, 7, 1, 4, 9, 16, 25);

// ### 목록 매핑

// 추상화하기전 함수
function scale_list(items, factor) {
  return is_null(items)
    ? null
    : pair(head(items) * factor, scale_list(tail(items), factor));
}

scale_list(list(1, 2, 3, 4, 5), 10);
[10, [20, [30, [40, [50, null]]]]];

//추상화
function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

map(abs, list(-10, 2.5, -11.6, 17));
[10, [2.5, [11.6, [17, null]]]];

map((x) => x * x, list(1, 2, 3, 4));
[1, [4, [9, [16, null]]]];

function scale_list(items, factor) {
  return map((x) => x * factor, items);
}

// ## 위계적 구조
function count_leaves(x) {
  return is_null(x)
    ? 0
    : !is_pair(x)
    ? 1
    : count_leaves(head(x)) + count_leaves(tail(x));
}

// map 적용전
function scale_tree(tree, factor) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? tree * factor
    : pair(scale_tree(head(tree), factor), scale_tree(tail(tree), factor));
}

scale_tree(list(1, list(2, list(3, 4), 5), list(6, 7)), 10);
list(10, list(20, list(30, 40), 50), list(60, 70));

// map 적용후
function scale_tree(tree, factor) {
  return map(
    (sub_tree) =>
      is_pair(sub_tree) ? scale_tree(sub_tree, factor) : sub_tree * factor,
    tree
  );
}

// ## 합의된 인터페이스로서의 순차열

function sum_odd_squares(tree) {
  return is_null(tree)
    ? 0
    : !is_pair(tree)
    ? is_odd(tree)
      ? square(tree)
      : 0
    : sum_odd_squares(head(tree)) + sum_odd_squares(tail(tree));
}
// 트리의 잎들을 나열(열거)한다.
// 홀수 잎들만 선택하는 필터를 적용한다.(is_odd)
// 선택된 각 잎의 수치를 제곱하낟.(square)
// 0에서 출발해서, +를 이용해서 그 제곱들을 누산한다.(+,0)

function even_fibs(n) {
  function next(k) {
    if (k > n) {
      return null;
    } else {
      const f = fib(k);
      return is_even(f) ? pair(f, next(k + 1)) : next(k + 1);
    }
  }
  return next(0);
}
// 0에서 n까지의 정수를 나열한다.
// 각 정수를 색인으로 사용해서 해당 피보나치 수를 계산한다.(fib)
// 짝수 피보나치 수들만 선택하는 필터를 적용한다.(is_even)
// 빈 목록에서 출발해서, pair를 이용해서 그 피보나치 수들을 누산(누적)한다.(pair, null)

// 비교해보면 둘은 아주 비슷하다. 신호 흐름 구조를 명확하게 드러내도록 프로그램을 조직화하자.

// 조직화 하기 위한 사전 단계들

map(square, list(1, 2, 3, 4, 5));
list(1, 4, 9, 16, 25);

filter(is_odd, list(1, 2, 3, 4, 5));
list(1, 3, 5);

accumulate(plus, 0, list(1, 2, 3, 4, 5));
15;

accumulate(times, 1, list(1, 2, 3, 4, 5));
120;

accumulate(pair, null, list(1, 2, 3, 4, 5));
list(1, 2, 3, 4, 5);

enumerate_interval(2, 7);
list(2, 3, 4, 5, 6, 7);

enumerate_tree(list(1, list(2, list(3, 4)), 5));
list(1, 2, 3, 4, 5);

// 최종단계
function sum_odd_squares(tree) {
  return accumulate(plus, 0, map(square, filter(is_odd, enumerate_tree(tree))));
}

function even_fibs(n) {
  return accumulate(
    pair,
    null,
    filter(is_even, map(fib, enumerate_interval(0, n)))
  );
}
