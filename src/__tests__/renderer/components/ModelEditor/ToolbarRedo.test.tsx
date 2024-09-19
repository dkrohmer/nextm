import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolbarRedo from '../../../../renderer/components/ModelEditor/ToolbarRedo';
import actions from '../../../../renderer/services/model-editor/actions';
import { Graph as x6Graph } from '@antv/x6';

// Mock the actions service
jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  redoAction: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, disabled, children }) => (
      <button data-testid="toolbar-redo" onClick={onClick} disabled={disabled}>
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

describe('ToolbarRedo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the redo toolbar item as enabled and handles redo action on click', () => {
    // Mock useSelector to return canRedo as true
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: { canRedo: true },
    }));

    render(<ToolbarRedo graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const redoButton = screen.getByTestId('toolbar-redo');
    expect(redoButton).toBeInTheDocument();
    expect(redoButton).not.toBeDisabled();

    // Simulate a click on the toolbar item
    fireEvent.click(redoButton);

    // Verify that the redoAction was called with the graph instance
    expect(actions.redoAction).toHaveBeenCalledWith(mockGraph);
  });

  it('renders the redo toolbar item as disabled when canRedo is false', () => {
    // Mock useSelector to return canRedo as false
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: { canRedo: false },
    }));

    render(<ToolbarRedo graph={mockGraph} />);

    // Check if the toolbar item is rendered and disabled
    const redoButton = screen.getByTestId('toolbar-redo');
    expect(redoButton).toBeInTheDocument();
    expect(redoButton).toBeDisabled();

    // Try to simulate a click on the toolbar item
    fireEvent.click(redoButton);

    // Verify that the redoAction was not called since the button is disabled
    expect(actions.redoAction).not.toHaveBeenCalled();
  });
});
