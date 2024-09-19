import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModelCreatedAt from '../../../../renderer/components/Model/CreatedAt';

describe('ModelCreatedAt Component', () => {
  it('renders the formatted creation date', () => {
    const testDate = '2024-08-23T15:30:00Z'; // Example date
    const formattedDate = new Date(testDate).toLocaleString();

    render(<ModelCreatedAt createdAt={testDate} />);

    // Verify that the component renders the formatted date correctly
    expect(screen.getByText(`Created at: ${formattedDate}`)).toBeInTheDocument();
  });
});
