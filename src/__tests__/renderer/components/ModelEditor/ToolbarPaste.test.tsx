import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarPaste from '../../../../renderer/components/ModelEditor/ToolbarPaste';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  pasteAction: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

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

    const pasteButton = screen.getByTestId('toolbar-paste');
    expect(pasteButton).toBeInTheDocument();

    fireEvent.click(pasteButton);

    expect(actions.pasteAction).toHaveBeenCalledWith(mockGraph);
  });
});
