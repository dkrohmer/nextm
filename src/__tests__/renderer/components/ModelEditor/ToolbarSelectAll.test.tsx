import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarSelectAll from '../../../../renderer/components/ModelEditor/ToolbarSelectAll';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';


jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  selectAllAction: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-select-all" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarSelectAll Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the select all toolbar item and handles select all action on click', () => {
    render(<ToolbarSelectAll graph={mockGraph} />);

    const selectAllButton = screen.getByTestId('toolbar-select-all');
    expect(selectAllButton).toBeInTheDocument();

    fireEvent.click(selectAllButton);

    expect(actions.selectAllAction).toHaveBeenCalledWith(mockGraph);
  });
});
