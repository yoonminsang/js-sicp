2.4 추상 데이터의 다중 표현

> 데이터 추상화 장벽들은 복잡성을 다스리는 데 위력을 발휘하는 도구이다. 데이터 객체들의 바탕 표현을 프로그램의 나머지 부분과 격리하면 큰 프로그램 하나를 설계하는 작업을 각자 따로 수행할 수 있는 더 작은 설계 작업들로 분할할 수 있다. 그런데 이런 종류의 데이터추상화가 항상 우리가 원한 만큼의 위력을 발휘하지는 않는다. 데이터 객체의 '바탕 표현'이라는 것이 명확하지 않을 때가 있기 때문이다.

> 데이터의 표현과 사용을 분리하는 데이터 추상화 장벽뿐만 아니라 서로 다른 설계상의 선택 사항들을 분리하는 장벽도 필요하다.

ex1 복소수는 직교좌표 형태, 극좌표 형태 두가지로 나뉠 수 있다.

- 더하거나 뺄때는 실수부와 허수부를 사용하는것이 자연스럽고(직교좌표)
- 곰하거나 나눌때는 크기와 각도를 사용하는 것이 자연스럽다.(극좌표)

ex2 퀼 에디터에서 퀼데이터로 저장하는 방법, html로 저장하는 방법 두가지로 나뉠 수 있다.

> 복소수 표현 중 하나를 사용하는 것이 아니라 둘 다 사용하기로 결정할 수도 있다.(태그된 데이터)

책에서도 나와있지만 설계는 언제든지 바뀔 수 있고 어떻게 설계하냐에 따라서 선택할 수 있는 가지수가 제한될 수도 있다. 그리고 이런 경우를 자주 봐왔다. 그런데 아얘 선택 사항을 분리하고 두 가지 경우를 모두 제공한다는 점이 되게 놀라웠다. 최근 에디터의 저장 방법에 대해서 고민했었는데 복소수의 경우와 예시가 비슷해보였다. 이걸 기반으로 더 좋은 해결책을 제시해야겠다.

데이터 지향적 프로그래밍과 가산성

> 태그 방식으로 디스패치를 구현하면 중요한 약점이 두 가지 생긴다. 하나는 모든 구현에 대한 정보를 일반적 인터페이스 함수들 자체에 포함해야 한다는 것이다.(real_part, image_part, magnitude, angle) 또 다른 약점은, 개별 표현들을 서로 다른 프로그래머가 따로 만들 수는 있지만, 함수의 이름이 중복되어서는 안된다는 제약이 따른다는 점이다.
> 이런식으로 일반적 인터페이스를 구현하는 기법에는 가산성이 없다.
> 데이터 지향적 프로그래밍은 시스템 설계를 더욱 모듈화해서 문제를 해결한다.

직교좌표 표현을 개발하는 개발자 A는 이전과 동일하게 자신의 코드를 구현하고

```
function install_rectangular_package(){
  // 내부함수들
  function real_part(){}
  // ....

  // 시스템 나머지 부분과의 인터페이스
  function tag(x){return attach_tag("rectangular",x);}
  put("real_part",list("rectangular"),real_part);
  // ...
  return "done";
}
```

극좌표 표현을 개발하는 개발자 B도 이전과 동일하게 자신의 코드를 구현한다.

```
function install_polar_package(){
  // 내부함수들
  function real_part(){}
  // ....

  // 시스템 나머지 부분과의 인터페이스
  function tag(x){return attach_tag("polar",x);}
  put("real_part",list("polar"),real_part);
  // ...
  return "done";
}
```

복소수 산술 선택자들은 apply_generic이라고 하는 일반적 '연산' 함수를 이용해서 테이블에 접근한다.

```
function apply_generic(op, args){
  const type_tags = map(type_tag, args);
  const fun - get(op, type_tags);
  return ! is_undefined(fun)
         ? apply_in_underlying_javascript(fun, map(contents, args))
         : error(list(op, type_tags),
                 "no method for these types -- apply_generic");
}
```

```
function real_part(z) { return apply_generic("real_part", list(z)); }
function imag_part(z) { return apply_generic("imag_part", list(z)); }
function magnitude(z) { return apply_generic("magnitude", list(z)); }
function angle(z) { return apply_generic("angle", list(z)); }
```

```
function make_from_real_imag(x, y){
  return get("make_from_real_imag", "rectangular")(x, y);
}
function make_from_mag_imag(r, a){
  return get("make_from_mag_imag", "polar")(r, a);
}
```
