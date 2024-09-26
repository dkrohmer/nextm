import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph as x6Graph } from '@antv/x6';
import StencilContainer from '../../../../renderer/components/ModelEditor/Stencil';
import productsReducer from '../../../../renderer/store/products';
import incrementsReducer from '../../../../renderer/store/increments';
import modelsReducer from '../../../../renderer/store/models';
import useSetupStencil from '../../../../renderer/hooks/model-editor/useSetupStencil';

// Mock the useSetupStencil hook
jest.mock('../../../../renderer/hooks/model-editor/useSetupStencil');

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Create a test store with the necessary slices
const store = configureStore({
  reducer: {
    products: productsReducer,
    increments: incrementsReducer,
    models: modelsReducer,
  },
});

// Helper function to render components with Redux provider
const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('StencilContainer Component', () => {
  const mockRef = { current: document.createElement('div') }; // Create a mock ref object

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the implementation of useSetupStencil to return the mockRef
    (useSetupStencil as jest.Mock).mockReturnValue(mockRef);
  });

  it('renders the StencilContainer component with the correct class', () => {
    const { container } = renderWithRedux(
      <StencilContainer graph={mockGraph} />,
    );

    // Check that the stencil container is rendered with the correct class
    const stencilElement = container.querySelector('.stencil-container');
    expect(stencilElement).toBeInTheDocument();
    expect(stencilElement).toHaveClass('stencil-container');
  });

  it('calls useSetupStencil with the correct graph', () => {
    renderWithRedux(<StencilContainer graph={mockGraph} />);

    // Check that useSetupStencil was called with the correct graph
    expect(useSetupStencil).toHaveBeenCalledWith(mockGraph);
  });
});
