import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarZoomOut from '../../../../renderer/components/ModelEditor/ToolbarZoomOut';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  zoomOutAction: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-zoom-out" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarZoomOut Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the zoom out toolbar item and handles zoom out action on click', () => {
    render(<ToolbarZoomOut graph={mockGraph} />);

    const zoomOutButton = screen.getByTestId('toolbar-zoom-out');
    expect(zoomOutButton).toBeInTheDocument();

    fireEvent.click(zoomOutButton);

    expect(actions.zoomOutAction).toHaveBeenCalledWith(mockGraph);
  });
});
