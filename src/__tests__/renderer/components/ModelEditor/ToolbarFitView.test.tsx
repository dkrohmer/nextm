import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarFitView from '../../../../renderer/components/ModelEditor/ToolbarFitView';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  fitViewAction: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-fitView" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarFitView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the fit view toolbar item and handles fit view action on click', () => {
    render(<ToolbarFitView graph={mockGraph} />);

    const fitViewButton = screen.getByTestId('toolbar-fitView');
    expect(fitViewButton).toBeInTheDocument();

    fireEvent.click(fitViewButton);

    expect(actions.fitViewAction).toHaveBeenCalledWith(mockGraph);
  });
});
