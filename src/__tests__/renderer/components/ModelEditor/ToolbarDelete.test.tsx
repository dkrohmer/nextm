import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolbarDelete from '../../../../renderer/components/ModelEditor/ToolbarDelete';
import actions from '../../../../renderer/services/model-editor/actions';
import { Graph as x6Graph } from '@antv/x6';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  deleteAction: jest.fn(),
}));

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-delete" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

describe('ToolbarDelete Component', () => {
  it('renders the delete toolbar item and handles delete action on click', () => {
    render(<ToolbarDelete graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const deleteButton = screen.getByTestId('toolbar-delete');
    expect(deleteButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(deleteButton);

    // Verify that the delete action was called with the graph instance
    expect(actions.deleteAction).toHaveBeenCalledWith(mockGraph);
  });
});
