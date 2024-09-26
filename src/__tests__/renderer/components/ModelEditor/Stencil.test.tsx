import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph as x6Graph } from '@antv/x6';
import StencilContainer from '../../../../renderer/components/ModelEditor/Stencil';
import productsReducer from '../../../../renderer/store/products';
import incrementsReducer from '../../../../renderer/store/increments';
import modelsReducer from '../../../../renderer/store/models';
import useSetupStencil from '../../../../renderer/hooks/model-editor/useSetupStencil';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/hooks/model-editor/useSetupStencil');

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

const store = configureStore({
  reducer: {
    products: productsReducer,
    increments: incrementsReducer,
    models: modelsReducer,
  },
});

const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('StencilContainer Component', () => {
  const mockRef = { current: document.createElement('div') };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSetupStencil as jest.Mock).mockReturnValue(mockRef);
  });

  it('renders the StencilContainer component with the correct class', () => {
    const { container } = renderWithRedux(
      <StencilContainer graph={mockGraph} />,
    );

    const stencilElement = container.querySelector('.stencil-container');
    expect(stencilElement).toBeInTheDocument();
    expect(stencilElement).toHaveClass('stencil-container');
  });

  it('calls useSetupStencil with the correct graph', () => {
    renderWithRedux(<StencilContainer graph={mockGraph} />);

    expect(useSetupStencil).toHaveBeenCalledWith(mockGraph);
  });
});
