import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarUndo from '../../../../renderer/components/ModelEditor/ToolbarUndo';
import actions from '../../../../renderer/services/model-editor/actions';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  undoAction: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, disabled, children }) => (
      <button data-testid="toolbar-undo" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    )),
  },
}));

// Mock useSelector hook
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ToolbarUndo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the undo toolbar item as enabled and handles undo action on click', () => {
    // Mock useSelector to return canUndo as true
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { canUndo: true },
      }),
    );

    render(<ToolbarUndo graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const undoButton = screen.getByTestId('toolbar-undo');
    expect(undoButton).toBeInTheDocument();
    expect(undoButton).not.toBeDisabled();

    // Simulate a click on the toolbar item
    fireEvent.click(undoButton);

    // Verify that the undoAction was called with the graph instance
    expect(actions.undoAction).toHaveBeenCalledWith(mockGraph);
  });

  it('renders the undo toolbar item as disabled when canUndo is false', () => {
    // Mock useSelector to return canUndo as false
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { canUndo: false },
      }),
    );

    render(<ToolbarUndo graph={mockGraph} />);

    // Check if the toolbar item is rendered and disabled
    const undoButton = screen.getByTestId('toolbar-undo');
    expect(undoButton).toBeInTheDocument();
    expect(undoButton).toBeDisabled();

    // Try to simulate a click on the toolbar item
    fireEvent.click(undoButton);

    // Verify that the undoAction was not called since the button is disabled
    expect(actions.undoAction).not.toHaveBeenCalled();
  });
});
