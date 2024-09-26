import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarCopy from '../../../../renderer/components/ModelEditor/ToolbarCopy';
import actions from '../../../../renderer/services/model-editor/actions';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  copyAction: jest.fn(),
}));

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-copy" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

describe('ToolbarCopy Component', () => {
  it('renders the copy toolbar item and handles copy action on click', () => {
    render(<ToolbarCopy graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const copyButton = screen.getByTestId('toolbar-copy');
    expect(copyButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(copyButton);

    // Verify that the copy action was called with the graph instance
    expect(actions.copyAction).toHaveBeenCalledWith(mockGraph);
  });
});
