import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarRedo from '../../../../renderer/components/ModelEditor/ToolbarRedo';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  redoAction: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, disabled, children }) => (
      <button data-testid="toolbar-redo" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    )),
  },
}));

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ToolbarRedo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the redo toolbar item as enabled and handles redo action on click', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { canRedo: true },
      }),
    );

    render(<ToolbarRedo graph={mockGraph} />);

    const redoButton = screen.getByTestId('toolbar-redo');
    expect(redoButton).toBeInTheDocument();
    expect(redoButton).not.toBeDisabled();

    fireEvent.click(redoButton);

    expect(actions.redoAction).toHaveBeenCalledWith(mockGraph);
  });

  it('renders the redo toolbar item as disabled when canRedo is false', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: { canRedo: false },
      }),
    );

    render(<ToolbarRedo graph={mockGraph} />);

    const redoButton = screen.getByTestId('toolbar-redo');
    expect(redoButton).toBeInTheDocument();
    expect(redoButton).toBeDisabled();

    fireEvent.click(redoButton);

    expect(actions.redoAction).not.toHaveBeenCalled();
  });
});
