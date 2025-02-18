import { createUser } from './userController';
import { saveUser } from './userService';

// userService의 saveUser 함수를 모킹

// 이 테스트의 코드의 목적은
// 201(응답성공)
// 404(페이지 x)
// 500(데이터 잘못됨)
// 등의 상황을 미리 확인하고 구현할 준비를 위해 작업을 진행
jest.mock('./userService');

describe('createUser Controller', () => {
    // 각 테스트 전에 mock 초기화
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('유효한 사용자 데이터로 요청시 사용자가 생성되어야 함', async () => {
        // Mock 요청 객체
        // --> 사용자가 이런 데이터를 입력했다 가정해보는거임
        // --> 요청이 이런식으로 데이터를 받아왔다 가정
        const req = {
            body: {
                username: 'testuser',
                password: 'password123'
            }
        };

        // Mock 응답 객체
        // 추후 응답에 대해 이런 함수 쓸거고 이런식으로 나갈것이다를 정의 해두는거
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // saveUser 함수가 반환할 값을 미리 정의
        // --> 마찬가지로 이런 데이터가 실존하느냐 아니냐는 중요 x
        // --> 다만 우리가 테스트로 만들어보고 이 결과가 나오는지 아닌지만 확인
        const mockUser = {
            id: 1,
            username: 'testuser'
        };
        saveUser.mockResolvedValue(mockUser);

        // 컨트롤러 함수 실행
        await createUser(req, res);

        // 검증
        // 검증에서도 굳이 DB에 있는 데이터가 아니라 테스트용도로 사용해볼 수 있음
        // 아무 데이터나 입력해서 사용해볼 수 있음
        expect(saveUser).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'password123'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('잘못된 입력값으로 요청시 400 에러를 반환해야 함', async () => {
        const req = {
            body: {
                username: '' // 잘못된 입력
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createUser(req, res);

        expect(saveUser).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: '모든 필드를 입력해주세요'
        });
    });

    test('데이터베이스 에러 발생시 500 에러를 반환해야 함', async () => {
        const req = {
            body: {
                username: 'testuser',
                password: 'password123'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // 데이터베이스 에러 시뮬레이션
        saveUser.mockRejectedValue(new Error('DB 에러'));

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: '서버 에러'
        });
    });
});