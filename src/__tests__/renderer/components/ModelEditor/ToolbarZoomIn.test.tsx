import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarZoomIn from '../../../../renderer/components/ModelEditor/ToolbarZoomIn';
import actions from '../../../../renderer/services/model-editor/actions';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  zoomInAction: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-zoom-in" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarZoomIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the zoom in toolbar item and handles zoom in action on click', () => {
    render(<ToolbarZoomIn graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const zoomInButton = screen.getByTestId('toolbar-zoom-in');
    expect(zoomInButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(zoomInButton);

    // Verify that the zoomInAction was called with the graph instance
    expect(actions.zoomInAction).toHaveBeenCalledWith(mockGraph);
  });
});
