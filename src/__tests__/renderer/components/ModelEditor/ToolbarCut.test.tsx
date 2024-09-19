import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolbarCut from '../../../../renderer/components/ModelEditor/ToolbarCut';
import actions from '../../../../renderer/services/model-editor/actions';
import { Graph as x6Graph } from '@antv/x6';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  cutAction: jest.fn(),
}));

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-cut" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

describe('ToolbarCut Component', () => {
  it('renders the cut toolbar item and handles cut action on click', () => {
    render(<ToolbarCut graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const cutButton = screen.getByTestId('toolbar-cut');
    expect(cutButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(cutButton);

    // Verify that the cut action was called with the graph instance
    expect(actions.cutAction).toHaveBeenCalledWith(mockGraph);
  });
});
