import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolbarFitView from '../../../../renderer/components/ModelEditor/ToolbarFitView';
import actions from '../../../../renderer/services/model-editor/actions';
import { Graph as x6Graph } from '@antv/x6';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  fitViewAction: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-fitView" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarFitView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the fit view toolbar item and handles fit view action on click', () => {
    render(<ToolbarFitView graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const fitViewButton = screen.getByTestId('toolbar-fitView');
    expect(fitViewButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(fitViewButton);

    // Verify that the fit view action was called with the graph instance
    expect(actions.fitViewAction).toHaveBeenCalledWith(mockGraph);
  });
});
