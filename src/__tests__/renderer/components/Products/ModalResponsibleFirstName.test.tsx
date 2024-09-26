import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { IResponsible } from '../../../../renderer/interfaces/IResponsible';
import ModalResponsibleFirstName from '../../../../renderer/components/Products/ModalResponsibleFirstName';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalResponsibleFirstName Component', () => {
  const responsible1: IResponsible = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Manager',
  };

  const responsible2: IResponsible = {
    id: '2',
    firstName: 'Alice',
    lastName: 'Smith',
    role: 'Engineer',
  };

  const emptyResponsible: IResponsible = {
    id: '',
    firstName: '',
    lastName: '',
    role: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current responsible first name', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [responsible1, responsible2],
          },
        },
      }),
    );

    render(<ModalResponsibleFirstName index={0} responsible={responsible1} />);

    const inputElement = screen.getByPlaceholderText('First Name');
    expect(inputElement).toHaveValue('John');
  });

  it('renders the input with an empty value when responsible first name is empty', () => {
    const emptyResponsible: IResponsible = {
      id: '3',
      firstName: '',
      lastName: 'Doe',
      role: 'Developer',
    };

    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [emptyResponsible],
          },
        },
      }),
    );

    render(
      <ModalResponsibleFirstName index={0} responsible={emptyResponsible} />,
    );

    const inputElement = screen.getByPlaceholderText('First Name');
    expect(inputElement).toHaveValue('');
  });

  it('dispatches setProductsCurrentProduct action on input change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [responsible1, responsible2],
          },
        },
      }),
    );

    render(<ModalResponsibleFirstName index={0} responsible={responsible1} />);

    const inputElement = screen.getByPlaceholderText('First Name');
    fireEvent.change(inputElement, { target: { value: 'Jane' } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          { ...responsible1, firstName: 'Jane' },
          responsible2,
        ],
      }),
    );
  });

  it('truncates the first name to 249 characters if it exceeds 250', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [
              { id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' },
            ],
          },
        },
      }),
    );

    render(
      <ModalResponsibleFirstName
        index={0}
        responsible={{
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          role: 'Manager',
        }}
      />,
    );

    const longInputValue = 'A'.repeat(260);
    const inputElement = screen.getByPlaceholderText('First Name');

    fireEvent.change(inputElement, { target: { value: longInputValue } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          {
            id: '1',
            firstName: 'A'.repeat(249),
            lastName: 'Doe',
            role: 'Manager',
          },
        ],
      }),
    );
  });
});
