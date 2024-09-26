import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import ImportModalSubmitButton from '../../../../renderer/components/ModelEditor/ImportModalSubmitButton';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ImportModalSubmitButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the submit button as enabled when importIsFileValid is true', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          importIsFileValid: true,
        },
      }),
    );

    render(<ImportModalSubmitButton />);

    const submitButton = screen.getByRole('button', { name: /import/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('renders the submit button as disabled when importIsFileValid is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          importIsFileValid: false,
        },
      }),
    );

    render(<ImportModalSubmitButton />);

    const submitButton = screen.getByRole('button', { name: /import/i });
    expect(submitButton).toBeDisabled();
  });

  it('renders the submit button with correct attributes', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          importIsFileValid: true,
        },
      }),
    );

    render(<ImportModalSubmitButton />);

    const submitButton = screen.getByRole('button', { name: /import/i });
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton).toHaveClass('primary');
  });
});
