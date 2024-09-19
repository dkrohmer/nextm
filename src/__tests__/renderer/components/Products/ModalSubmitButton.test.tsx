import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalSubmitButton from '../../../../renderer/components/Products/ModalSubmitButton';
import { jest } from '@jest/globals';

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalSubmitButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the submit button with text "Add" when not cloning or editing', () => {
    // Mock state where neither cloning nor editing is true
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsIsCloning: false,
        productsIsEditing: false,
      },
    }));

    render(<ModalSubmitButton />);

    // Check if button renders with "Add" text
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the submit button with text "Edit" when editing', () => {
    // Mock state where editing is true
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsIsCloning: false,
        productsIsEditing: true,
      },
    }));

    render(<ModalSubmitButton />);

    // Check if button renders with "Edit" text
    const buttonElement = screen.getByRole('button', { name: /Edit/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the submit button with text "Clone" when cloning', () => {
    // Mock state where cloning is true
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsIsCloning: true,
        productsIsEditing: false,
      },
    }));

    render(<ModalSubmitButton />);

    // Check if button renders with "Clone" text
    const buttonElement = screen.getByRole('button', { name: /Clone/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the correct button attributes', () => {
    // Mock state where neither cloning nor editing is true
    mockUseSelector.mockImplementation((selector: any) => selector({
      products: {
        productsIsCloning: false,
        productsIsEditing: false,
      },
    }));

    render(<ModalSubmitButton />);

    // Check if the button has the correct attributes
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('primary');
  });
});
