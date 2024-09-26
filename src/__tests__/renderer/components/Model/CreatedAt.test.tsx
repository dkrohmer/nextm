import { render, screen } from '@testing-library/react';
import ModelCreatedAt from '../../../../renderer/components/Model/CreatedAt';
import '@testing-library/jest-dom';

describe('ModelCreatedAt Component', () => {
  it('renders the formatted creation date', () => {
    const testDate = '2024-08-23T15:30:00Z';
    const formattedDate = new Date(testDate).toLocaleString();

    render(<ModelCreatedAt createdAt={testDate} />);

    expect(
      screen.getByText(`Created at: ${formattedDate}`),
    ).toBeInTheDocument();
  });
});
