import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolbarZoomOut from '../../../../renderer/components/ModelEditor/ToolbarZoomOut';
import actions from '../../../../renderer/services/model-editor/actions';
import { Graph as x6Graph } from '@antv/x6';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  zoomOutAction: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-zoom-out" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarZoomOut Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the zoom out toolbar item and handles zoom out action on click', () => {
    render(<ToolbarZoomOut graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const zoomOutButton = screen.getByTestId('toolbar-zoom-out');
    expect(zoomOutButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(zoomOutButton);

    // Verify that the zoomOutAction was called with the graph instance
    expect(actions.zoomOutAction).toHaveBeenCalledWith(mockGraph);
  });
});
