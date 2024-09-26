import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarZoomIn from '../../../../renderer/components/ModelEditor/ToolbarZoomIn';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  zoomInAction: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-zoom-in" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarZoomIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the zoom in toolbar item and handles zoom in action on click', () => {
    render(<ToolbarZoomIn graph={mockGraph} />);

    const zoomInButton = screen.getByTestId('toolbar-zoom-in');
    expect(zoomInButton).toBeInTheDocument();

    fireEvent.click(zoomInButton);

    expect(actions.zoomInAction).toHaveBeenCalledWith(mockGraph);
  });
});
