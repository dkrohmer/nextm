import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Graph as x6Graph } from '@antv/x6';
import Graph from '../../../../renderer/components/ModelEditor/Graph';
import productsReducer from '../../../../renderer/store/products';
import incrementsReducer from '../../../../renderer/store/increments';
import modelsReducer from '../../../../renderer/store/models';
import '@testing-library/jest-dom';

jest.mock(
  '../../../../renderer/components/ModelEditor/Stencil',
  () =>
    function () {
      return <div data-testid="stencil-container">StencilContainer</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/Toolbar',
  () =>
    function () {
      return <div data-testid="toolbar">Toolbar</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ExportModal',
  () =>
    function () {
      return <div data-testid="export-modal">ExportModal</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ImportModal',
  () =>
    function () {
      return <div data-testid="import-modal">ImportModal</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ActorModal',
  () =>
    function () {
      return <div data-testid="actor-modal">ActorModal</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/SystemModal',
  () =>
    function () {
      return <div data-testid="system-modal">SystemModal</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/ZoneModal',
  () =>
    function () {
      return <div data-testid="zone-modal">ZoneModal</div>;
    },
);
jest.mock(
  '../../../../renderer/components/ModelEditor/DataflowModal',
  () =>
    function () {
      return <div data-testid="dataflow-modal">DataflowModal</div>;
    },
);

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

describe('Graph Component', () => {
  beforeEach(() => {
    store.dispatch({
      type: 'products/setProduct',
      payload: { name: 'ProductA' },
    });
    store.dispatch({
      type: 'increments/setIncrement',
      payload: { name: 'IncrementB' },
    });
    store.dispatch({
      type: 'models/setModel',
      payload: { name: 'ModelC' },
    });
  });

  it('renders all child components with the correct props', () => {
    renderWithRedux(<Graph graph={mockGraph} />);

    expect(screen.getByTestId('stencil-container')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('export-modal')).toBeInTheDocument();
    expect(screen.getByTestId('import-modal')).toBeInTheDocument();
    expect(screen.getByTestId('actor-modal')).toBeInTheDocument();
    expect(screen.getByTestId('system-modal')).toBeInTheDocument();
    expect(screen.getByTestId('zone-modal')).toBeInTheDocument();
    expect(screen.getByTestId('dataflow-modal')).toBeInTheDocument();
  });

  it('passes the correct filename prop to the ExportModal component', () => {
    renderWithRedux(<Graph graph={mockGraph} />);

    const exportModal = screen.getByTestId('export-modal');
    expect(exportModal).toBeInTheDocument();
  });
});
