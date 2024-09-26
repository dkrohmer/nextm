import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setProductsCurrentProduct } from '../../../../renderer/store/products';
import { IResponsible } from '../../../../renderer/interfaces/IResponsible';
import ModalResponsibleRemoveButton from '../../../../renderer/components/Products/ModalResponsibleRemoveButton';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ModalResponsibleRemoveButton Component', () => {
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

  it('removes the correct responsible on button click', () => {
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

    render(<ModalResponsibleRemoveButton index={0} />);

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [responsible2],
      }),
    );
  });

  it('handles removal of all responsibles and sets an empty array', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: [responsible1],
          },
        },
      }),
    );

    render(<ModalResponsibleRemoveButton index={0} />);

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [],
      }),
    );
  });

  it('handles undefined responsibles array and sets an empty array', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            createdAt: '1',
            responsibles: undefined,
          },
        },
      }),
    );

    render(<ModalResponsibleRemoveButton index={0} />);

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      setProductsCurrentProduct({
        id: '1',
        name: 'Test Product',
        createdAt: '1',
        responsibles: [],
      }),
    );
  });

  it('does nothing if productsCurrentProduct is undefined', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: undefined,
        },
      }),
    );

    render(<ModalResponsibleRemoveButton index={0} />);

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
