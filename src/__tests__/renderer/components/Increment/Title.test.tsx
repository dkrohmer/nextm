import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from '../../../../renderer/components/Increment/Title';

describe('Title Component', () => {
  it('renders the title with the correct number and name', () => {
    const number = 1;
    const name = 'Test Increment';

    const { container } = render(<Title number={number} name={name} />);

    // Verify the icon is rendered by checking the class name
    const iconElement = container.querySelector('.dropdown.icon');
    expect(iconElement).toBeInTheDocument();

    // Verify the text content is correct
    expect(screen.getByText(`Increment #${number}: ${name}`)).toBeInTheDocument();
  });
});
