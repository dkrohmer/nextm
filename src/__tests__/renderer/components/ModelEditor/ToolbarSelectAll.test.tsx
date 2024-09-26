import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarSelectAll from '../../../../renderer/components/ModelEditor/ToolbarSelectAll';
import actions from '../../../../renderer/services/model-editor/actions';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  selectAllAction: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-select-all" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarSelectAll Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the select all toolbar item and handles select all action on click', () => {
    render(<ToolbarSelectAll graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const selectAllButton = screen.getByTestId('toolbar-select-all');
    expect(selectAllButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(selectAllButton);

    // Verify that the selectAllAction was called with the graph instance
    expect(actions.selectAllAction).toHaveBeenCalledWith(mockGraph);
  });
});
