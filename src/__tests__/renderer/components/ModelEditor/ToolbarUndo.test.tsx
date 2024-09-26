import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarUndo from '../../../../renderer/components/ModelEditor/ToolbarUndo';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  undoAction: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, disabled, children }) => (
      <button data-testid="toolbar-undo" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    )),
  },
}));

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ToolbarUndo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the undo toolbar item as enabled and handles undo action on click', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { canUndo: true },
      }),
    );

    render(<ToolbarUndo graph={mockGraph} />);

    const undoButton = screen.getByTestId('toolbar-undo');
    expect(undoButton).toBeInTheDocument();
    expect(undoButton).not.toBeDisabled();

    fireEvent.click(undoButton);

    expect(actions.undoAction).toHaveBeenCalledWith(mockGraph);
  });

  it('renders the undo toolbar item as disabled when canUndo is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { canUndo: false },
      }),
    );

    render(<ToolbarUndo graph={mockGraph} />);

    const undoButton = screen.getByTestId('toolbar-undo');
    expect(undoButton).toBeInTheDocument();
    expect(undoButton).toBeDisabled();

    fireEvent.click(undoButton);

    expect(actions.undoAction).not.toHaveBeenCalled();
  });
});
