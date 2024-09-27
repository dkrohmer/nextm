import { render, screen } from '@testing-library/react';
import Title from '../../../../renderer/components/Increment/Title';
import '@testing-library/jest-dom';

describe('Title Component', () => {
  it('renders the title with the correct number and name', () => {
    const number = 1;
    const name = 'Test Increment';

    const { container } = render(<Title number={number} name={name} />);
    const iconElement = container.querySelector('.dropdown.icon');

    expect(iconElement).toBeInTheDocument();

    expect(
      screen.getByText(`Increment #${number}: ${name}`),
    ).toBeInTheDocument();
  });
});
