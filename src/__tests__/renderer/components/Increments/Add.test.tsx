import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { initialIncrementsState } from '../../../../renderer/store/increments';
import { initialProductsState } from '../../../../renderer/store/products';
import incrementsReducer, {
  IncrementsState,
  setCurrentIncrement,
  setIncrementsIsEditing,
  setIncrementsModalOpen,
} from '../../../../renderer/store/increments';
import productsReducer, {
  ProductsState,
} from '../../../../renderer/store/products';
import Add from '../../../../renderer/components/Increments/Add';


interface RootState {
  increments: IncrementsState;
  products: ProductsState;
}

const createTestStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      increments: incrementsReducer,
      products: productsReducer,
    },
    preloadedState: initialState as RootState,
  });
};

const renderWithStore = (
  ui: React.ReactElement,
  initialState: Partial<RootState> = {},
) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );
};

describe('Add Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithStore(<Add />, {
      increments: { ...initialIncrementsState, incrementsModalOpen: false },
      products: initialProductsState,
    });

    expect(screen.getByText(/\+ Add Increment/i)).toBeInTheDocument();
  });

  it('dispatches actions on click', () => {
    jest
      .spyOn(
        require('../../../../renderer/store/increments'),
        'setIncrementsIsEditing',
      )
      .mockImplementation(() => ({
        type: 'increments/setIncrementsIsEditing',
        payload: false,
      }));
    jest
      .spyOn(
        require('../../../../renderer/store/increments'),
        'setIncrementsModalOpen',
      )
      .mockImplementation(() => ({
        type: 'increments/setIncrementsModalOpen',
        payload: true,
      }));
    jest
      .spyOn(
        require('../../../../renderer/store/increments'),
        'setCurrentIncrement',
      )
      .mockImplementation(() => ({
        type: 'increments/setCurrentIncrement',
        payload: {
          id: '',
          name: '',
          start: '',
          end: '',
          deadline: '',
          state: '',
          productId: '',
        },
      }));

    renderWithStore(<Add />, {
      increments: { ...initialIncrementsState, incrementsModalOpen: false },
      products: initialProductsState,
    });

    fireEvent.click(screen.getByText(/\+ Add Increment/i));

    expect(setIncrementsIsEditing).toHaveBeenCalledWith(false);
    expect(setIncrementsModalOpen).toHaveBeenCalledWith(true);
    expect(setCurrentIncrement).toHaveBeenCalledWith({
      id: '',
      name: '',
      start: '',
      end: '',
      deadline: '',
      state: '',
      productId: '',
    });
  });

  it('does not dispatch actions if modal is already open', () => {
    jest
      .spyOn(
        require('../../../../renderer/store/increments'),
        'setIncrementsIsEditing',
      )
      .mockImplementation(() => {});
    jest
      .spyOn(
        require('../../../../renderer/store/increments'),
        'setIncrementsModalOpen',
      )
      .mockImplementation(() => {});
    jest
      .spyOn(
        require('../../../../renderer/store/increments'),
        'setCurrentIncrement',
      )
      .mockImplementation(() => {});
    renderWithStore(<Add />, {
      increments: { ...initialIncrementsState, incrementsModalOpen: true },
      products: initialProductsState,
    });

    fireEvent.click(screen.getByText(/\+ Add Increment/i));

    expect(setIncrementsIsEditing).not.toHaveBeenCalled();
    expect(setIncrementsModalOpen).not.toHaveBeenCalled();
    expect(setCurrentIncrement).not.toHaveBeenCalled();
  });
});
