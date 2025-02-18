import { saveUser } from './userService';

export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 입력값 검증
        if (!username || !password) {
            return res.status(400).json({ error: '모든 필드를 입력해주세요' });
        }

        // 사용자 저장
        const user = await saveUser({ username, password });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: '서버 에러' });
    }
};