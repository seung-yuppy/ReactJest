export const saveUser = async (user) => {
    // 이 코드는 추후 DB에 저장이나 조회 등의 내용들이 추가될 예정
    // 실제로는 데이터베이스에 저장하는 코드
    // 주소나 이런거 아무것도 안써서 이 코드 동작 x
    return await db.users.save(user);
};