import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Actions from '../../../../renderer/components/Increment/Actions';
import incrementsReducer from '../../../../renderer/store/increments';
import { IIncrement } from '../../../../renderer/interfaces/IIncrement';

const store = configureStore({
  reducer: {
    increments: incrementsReducer,
  },
});

describe('Actions Component', () => {
  const mockIncrement: IIncrement = {
    id: '1',
    name: 'Test Increment',
    productId: 'product-123',
    start: '2024-08-01T00:00:00Z',
    end: '2024-08-31T23:59:59Z',
    deadline: '2024-08-15T00:00:00Z',
    state: 'active',
  };

  const renderWithRedux = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders the Actions component with all child components when hovering', () => {
    renderWithRedux(<Actions increment={mockIncrement} number={1} isHovering={true} />);
    expect(screen.getByTestId('actions-container')).toHaveClass('visible');
  });

  it('renders the Actions component without visible class when not hovering', () => {
    renderWithRedux(<Actions increment={mockIncrement} number={1} isHovering={false} />);
    expect(screen.getByTestId('actions-container')).not.toHaveClass('visible');
  });
});
