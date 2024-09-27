import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';
import { IProduct } from '../../../../renderer/interfaces/IProduct';
import incrementsReducer, { setIncrementsActiveIndex } from '../../../../renderer/store/increments';
import Increment from '../../../../renderer/components/Increment';
import modelsReducer from '../../../../renderer/store/models';
import '@testing-library/jest-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

const mockIncrements: IIncrement[] = [
  { id: '1', name: 'Increment 1', productId: 'product-123' },
  { id: '2', name: 'Increment 2', productId: 'product-123' },
];

const mockProduct: IProduct = {
  id: 'product-123',
  name: 'Test Product',
  createdAt: '2024-08-01T00:00:00Z',
  description: 'Test Description',
  startsAt: '2024-08-01T00:00:00Z',
  endsAt: '2024-12-31T23:59:59Z',
  responsibles: [],
  latestIncrementId: '2',
};

const store = configureStore({
  reducer: {
    increments: incrementsReducer,
    models: modelsReducer,
  },
});

describe('Increment Component', () => {
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

  it('collapses the active accordion and navigates back to the product page', () => {
    store.dispatch(setIncrementsActiveIndex(0));

    renderWithProviders(
      <Increment
        product={mockProduct}
        increment={mockIncrements[0]}
        index={0}
      />,
    );

    const accordionTitle = screen.getByTestId('accordion-title-0');

    fireEvent.click(accordionTitle);

    const currentState = store.getState().increments;
    expect(currentState.incrementsActiveIndex).toBe(-1);
    expect(navigateMock).toHaveBeenCalledWith(`/products/${mockProduct.id}`);
  });

  it('activates the accordion and navigates to the increment when it is not active', () => {
    store.dispatch(setIncrementsActiveIndex(-1));

    renderWithProviders(
      <Increment
        product={mockProduct}
        increment={mockIncrements[0]}
        index={0}
      />,
    );

    const accordionTitle = screen.getByTestId('accordion-title-0');

    fireEvent.click(accordionTitle);

    const currentState = store.getState().increments;
    expect(currentState.incrementsActiveIndex).toBe(0);
    expect(navigateMock).toHaveBeenCalledWith(
      `/products/${mockProduct.id}/increments/${mockIncrements[0].id}`,
    );
  });

  it('sets isHovering to true on mouse enter', () => {
    store.dispatch(setIncrementsActiveIndex(-1));

    renderWithProviders(
      <Increment
        product={mockProduct}
        increment={mockIncrements[0]}
        index={0}
      />,
    );

    const incrementWrapper = screen.getByTestId('increment-wrapper-0');
    const actionsContainer = screen.getByTestId('actions-container');

    expect(actionsContainer).toBeVisible();

    fireEvent.mouseEnter(incrementWrapper);

    expect(actionsContainer).toHaveClass('visible');
  });

  it('sets isHovering to false on mouse leave', () => {
    store.dispatch(setIncrementsActiveIndex(-1));

    renderWithProviders(
      <Increment
        product={mockProduct}
        increment={mockIncrements[0]}
        index={0}
      />,
    );

    const incrementWrapper = screen.getByTestId('increment-wrapper-0');
    const actionsContainer = screen.getByTestId('actions-container');

    fireEvent.mouseEnter(incrementWrapper);

    expect(actionsContainer).toHaveClass('visible');

    fireEvent.mouseLeave(incrementWrapper);

    expect(actionsContainer).not.toHaveClass('visible');
  });
});
