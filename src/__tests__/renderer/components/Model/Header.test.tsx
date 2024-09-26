import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { IModel } from '../../../../renderer/interfaces/IModel';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import ModelHeader from '../../../../renderer/components/Model/Header';
import modelsReducer from '../../../../renderer/store/models';
import '@testing-library/jest-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

const mockModel: IModel = {
  id: 'model-1',
  name: 'Test Model',
  createdAt: '2024-08-01T00:00:00Z',
  incrementId: '1',
};

const mockIncrement: IIncrement = {
  id: 'increment-1',
  name: 'Test Increment',
  productId: 'product-123',
  start: '2024-08-01T00:00:00Z',
  end: '2024-08-31T23:59:59Z',
  deadline: '2024-08-15T00:00:00Z',
  state: 'active',
};

const mockProduct: IProduct = {
  id: 'product-123',
  name: 'Test Product',
  createdAt: '1',
};

const store = configureStore({
  reducer: {
    models: modelsReducer,
  },
});

describe('ModelHeader Component', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>{component}</MemoryRouter>
      </Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the model name and navigates on click', () => {
    renderWithProviders(
      <ModelHeader
        model={mockModel}
        increment={mockIncrement}
        product={mockProduct}
      />,
    );

    expect(screen.getByText(mockModel.name)).toBeInTheDocument();

    fireEvent.click(screen.getByText(mockModel.name));

    expect(navigateMock).toHaveBeenCalledWith(
      `/products/${mockProduct.id}/increments/${mockIncrement.id}/models/${mockModel.id}`,
    );
  });
});
