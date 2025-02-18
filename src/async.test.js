// function fetchUser(id, cb) {    // mock, spy가 아니더라도 콜백함수의 경우는 테스트에 지장은 없음
//     setTimeout(() => {
//         console.log("wait 0.1 sec.");

//         const user = {
//             id: id,
//             name: "User" + id,
//             email: id + "@test.com",
//         };

//         cb(user);

//     }, 100);
// }

// // done이 아무 의미없이 쓰는건 아님
// //  --> 비동기 테스트 자체를 의미하는 키워드라고도 볼 수 있음
// test("fetch a user", (done) => { // 콜백 인자에 done을 써서 비동기 함수 테스트임을 반드시 명시 !!

//     // test 시작시 fetchUser 함수가 호출이 되면 그 때 실행되는 콜백함수
//     // fetchUser가 리턴한 데이터를 받아 user라는 파라미터로 전달
//     //  --> toEqual을 통해 두 데이터를 비교 --> 결과 확인

//     const cb = (user) => {
//         // 인자로 받은 리턴값 user객체가 해당 객체와 Equal일 경우 테스트
//         expect(user).toEqual({
//             id: 1,
//             name: "User1",
//             email: "1@test.com",
//         });
//         // 비동기 작업이 완료된 후 호출하여 테스트가 끝났음을 의미
//         //  --> 만약 done 메서드를 호출하지 않으면? Jest는 테스트가 끝났는지를 알 수 없음
//         done(); // 비동기 실행 end
//         // 좀 더 정확히 Jest에서 명시적으로 이 테스트 함수는 비동기 코드를 테스트 하니 콜백함수가 호출되는지를 확인해 달라는 의미
//         // 비동기 함수 검증시 결과가 콜백으로 리턴된다면 콜백함수 파라미터에 done을 써준 후 done()메서드를 호출해서 끝내는 형식으로 처리
//     };

//     fetchUser(1, cb);
// });

// 코드 전체 흐름 정리
// 1. testCase가 실행
// 2. fetchUser(1, cb)를 호출하여 ID가 1인 사용자의 데이터를 가져옴
// 3. 데이터가 준비되면 cb 콜백함수가 실행
// 4. 콜백 함수 내부에서 리턴된 user 객체와 예상 객체를 비교
// 5. 예상 객체와 일치하면 테스트는 성공으로 간주
// 6. 마지막으로 done()을 호출하여 jest에 비동기 작업 완료를 알림



// Promise로 바꾸기
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("wait 0.1 sec.");

            const user = {
                id: id,
                name: "User" + id,
                email: id + "@test.com",
            };

            // cb(user);
            resolve(user);

        }, 100);
    })
};
// // promise 객체를 리턴받아오니 당연히 여기서는 프로미스를 실행할 준비
// // 비동기 실행과 Jest가 따로따로 논다
// //  --> 따로 노는 것(따로 실행)을 방지하기 위해 return을 정확히 명시
// test("fetch a user", () => {
//     // Promise 객체 함수에는 이미 return이 포함되어 있기 때문에 Jest가 Promise가 resolve 될 때까지 대기시키는 방법
//     return fetchUser(1).then((user) => {
//         expect(user).toEqual({
//             id: 1,
//             name: "User1",
//             email: "1@test.com",
//         });
//     })
// });

// Promise 코드 실행 순서
// 1. fetchUser 함수호출
// 2. --> 데이터를 받아오는 Promise를 리턴
// 3. Promise 객체가 리턴되면(성공적으로 완료됐을 경우) .then 블록에 있는 내용을 수행
// 4. user 객체가 예상한 값과 일치하는지 확인
// 5. user 객체가 예상한 값과 다르다면 테스트는 실패 맞으면 성공

test("fetch a user async", async () => {
    const user = await fetchUser(1);
    expect(user).toEqual({
        id: 1,
        name: "User1",
        email: "1@test.com",
    });
});