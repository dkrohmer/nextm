import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import ModalSubmitButton from '../../../../renderer/components/Increments/ModalSubmitButton';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalSubmitButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with text "Add" when not cloning or editing', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsEditing: false,
          incrementsIsCloning: false,
        },
      }),
    );

    render(<ModalSubmitButton />);

    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('renders the button with text "Edit" when editing', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsEditing: true,
          incrementsIsCloning: false,
        },
      }),
    );

    render(<ModalSubmitButton />);

    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
  });

  it('renders the button with text "Clone" when cloning', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsEditing: false,
          incrementsIsCloning: true,
        },
      }),
    );

    render(<ModalSubmitButton />);

    expect(screen.getByRole('button', { name: /Clone/i })).toBeInTheDocument();
  });

  it('renders the button with correct attributes', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        increments: {
          incrementsIsEditing: false,
          incrementsIsCloning: false,
        },
      }),
    );

    render(<ModalSubmitButton />);

    const button = screen.getByRole('button', { name: /Add/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('primary');
  });
});
