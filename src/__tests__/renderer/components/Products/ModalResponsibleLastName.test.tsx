import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { IResponsible } from '../../../../renderer/interfaces/IResponsible';
import ModalResponsibleLastName from '../../../../renderer/components/Products/ModalResponsibleLastName';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalResponsibleLastName Component', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the current responsible last name', () => {
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

    render(<ModalResponsibleLastName index={0} responsible={responsible1} />);

    const inputElement = screen.getByPlaceholderText('Last Name');
    expect(inputElement).toHaveValue('Doe');
  });

  it('renders the input with an empty value when responsible last name is empty', () => {
    const emptyResponsible: IResponsible = {
      id: '3',
      firstName: 'New',
      lastName: '',
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
      <ModalResponsibleLastName index={0} responsible={emptyResponsible} />,
    );

    const inputElement = screen.getByPlaceholderText('Last Name');
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

    render(<ModalResponsibleLastName index={0} responsible={responsible1} />);

    const inputElement = screen.getByPlaceholderText('Last Name');
    fireEvent.change(inputElement, { target: { value: 'Smith' } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          { ...responsible1, lastName: 'Smith' },
          responsible2,
        ],
      }),
    );
  });

  it('truncates the last name to 249 characters if it exceeds 250', () => {
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
      <ModalResponsibleLastName
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
    const inputElement = screen.getByPlaceholderText('Last Name');

    fireEvent.change(inputElement, { target: { value: longInputValue } });

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'A'.repeat(249),
            role: 'Manager',
          },
        ],
      }),
    );
  });
});
