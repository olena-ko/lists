import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import {CreateListForm} from "./CreateListForm.tsx";
import userEvent from '@testing-library/user-event';

test('allows typing into input', async () => {
    const user = userEvent.setup();

    render(<CreateListForm hideForm={() => {
    }} addNewList={() => {
    }}/>);

    const input = screen.getByPlaceholderText('List name');

    await user.type(input, 'Lena');

    expect(input).toHaveValue('Lena')
});
