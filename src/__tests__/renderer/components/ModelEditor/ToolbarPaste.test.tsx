import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarPaste from '../../../../renderer/components/ModelEditor/ToolbarPaste';
import actions from '../../../../renderer/services/model-editor/actions';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  pasteAction: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-paste" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarPaste Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the paste toolbar item and handles paste action on click', () => {
    render(<ToolbarPaste graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const pasteButton = screen.getByTestId('toolbar-paste');
    expect(pasteButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(pasteButton);

    // Verify that the paste action was called with the graph instance
    expect(actions.pasteAction).toHaveBeenCalledWith(mockGraph);
  });
});
