import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

// describe : 테스트 그룹 생성시 사용.
describe('Button Component', () => {

    test('renders button', () => {
        // const { getByText} = render(<Button>Click me</Button>);
        // expect(getByText('Click me')).toBeInTheDocument();
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(
            <Button onClick={handleClick}>Click me</Button>
        );
        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
})