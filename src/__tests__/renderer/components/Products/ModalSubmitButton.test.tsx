import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import ModalSubmitButton from '../../../../renderer/components/Products/ModalSubmitButton';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalSubmitButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the submit button with text "Add" when not cloning or editing', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsIsCloning: false,
          productsIsEditing: false,
        },
      }),
    );

    render(<ModalSubmitButton />);

    const buttonElement = screen.getByRole('button', { name: /Add/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the submit button with text "Edit" when editing', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsIsCloning: false,
          productsIsEditing: true,
        },
      }),
    );

    render(<ModalSubmitButton />);

    const buttonElement = screen.getByRole('button', { name: /Edit/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the submit button with text "Clone" when cloning', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsIsCloning: true,
          productsIsEditing: false,
        },
      }),
    );

    render(<ModalSubmitButton />);

    const buttonElement = screen.getByRole('button', { name: /Clone/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the correct button attributes', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsIsCloning: false,
          productsIsEditing: false,
        },
      }),
    );

    render(<ModalSubmitButton />);

    const buttonElement = screen.getByRole('button', { name: /Add/i });
    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('primary');
  });
});
