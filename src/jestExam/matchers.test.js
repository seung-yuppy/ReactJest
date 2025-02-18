// const { getUser } = require('./test1');

// test("user 객체 가져온 결과", () => {
//     expect(getUser(1)).toEqual({
//         id: 1,
//         email: `user1@gunchim.com`
//     })
// });

// test("숫자 0인지 문자 0인지 판별", () => {
//     expect(0).toBeFalsy();      // 숫자 0 : false의 의미도 있음
//     expect("0").toBeTruthy();   // 문자 0 : false가 아님
// });

// function drinkAll(callback, flavour) {
//     if (flavour !== 'octopus') {
//         callback(flavour);
//     }
// };

// 테스트 그룹화의 의미는 실행했을 때 잘될까 안될까를 기본적으로 구분할 때 사용
// describe('drinkAll', () => {

//     // 테스트 코드들은 간단한 규칙만 기억하면 된다
//     // 테스트할 내용을 호출한다
//     //  --> 호출 후 결과를 예상해보는 것
//     //  --> DBMS 연결 문제, 서버 연결 문제
//     test('drinks something lemon-flavoured', () => {
//         const drink = jest.fn();
//         drinkAll(drink, 'lemon');
//         expect(drink).toHaveBeenCalled(); // 함수 호출 O
//     });

//     test('does not drink something octopus-flavoured', () => {
//         const drink = jest.fn();
//         drinkAll(drink, 'octopus');
//         expect(drink).not.toHaveBeenCalled(); // 함수 호출 X
//     });
// });

// test("array 테스트 예시", () => {
//     const testArray = ["g", "u", "n", "chim"];

//     // expect(testArray).toHaveLength(7);
//     // expect(testArray).toContain("ssak");
//     expect(testArray).toContain("chim");
// })

// test("toThrow 테스트", () => {
//     expect(() => getUser(111)).toThrow(); // 예외 발생여부 확인
//     // 예외처리 메세지는 Enum같은 공통된 값을 통해 관리하는 것이 프로젝트의 규모가 커져도 메세지의 일관성을 쉽게 부여
//     expect(() => getUser(-1)).toThrow("하이용");
// });

// 아래와 같이 jest에서 함수를 테스트할 때는 모의함수라는 것을 임시로 만들어서 테스트하는 것을 권장
// --> 아래와 같이 사용하는 방법을 mock 함수라고 부름(모의함수) (주로 추적용이나 호출시 확인용도로 사용)
// const handleClick = jest.fn();
// --> mock의 경우는 화살표함수가 강제되는 단점이 있어 좀 더 복잡합 함수의 경우는 기존함수에 spy를 붙여 감시하는 형태로 구현도 가능

// const gunchim = jest.fn();

// spy의 경우는 객체의 메서드에만 사용할 수 있다는 특징이 있어서 날 것 그대로 선언했을 경우 인식을 못하는 경우가 발생
// 객체형태로 선언 후 spy에 객체를 인식시키는 방향으로 처리
// const test1 = {
//     gunchim: function (test) {
//         return test;
//     }
// };

// 외부 모듈 컴포넌트를 불러오는 방법
import * as test1 from "./spyModule";

test("함수호출 테스트", () => {
    const spy = jest.spyOn(test1, "gunchim");
    test1.gunchim("test");
    test1.gunchim("test");
    test1.gunchim("test");
    // expect(spy).toHaveBeenCalledTimes(3);
    // 내 생각에 a라는 값이 파라미터로 전달되야하는데 자꾸 다른 값이 호출된다면 사용
    // expect(spy).toHaveBeenCalledWith("test1");
    // expect(spy).toHaveReturned();
    expect(spy).toHaveReturnedWith("test");
});