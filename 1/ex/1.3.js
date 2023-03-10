// 1.3
// 세 개가 아니라 n개로 바꿔보자.
function ex(numbers) {
  return sumOfSquares(getNumberExceptMin(numbers));
}

function getNumberExceptMin(numbers) {
  return numbers.sort((a, b) => a - b).slice(1);
}

function sumOfSquares(numbers) {
  return numbers.reduce((acc, cur) => acc + square(cur), 0);
}

export function square(x) {
  return x ** 2;
}
