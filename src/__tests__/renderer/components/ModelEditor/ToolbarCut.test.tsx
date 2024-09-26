import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarCut from '../../../../renderer/components/ModelEditor/ToolbarCut';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  cutAction: jest.fn(),
}));

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-cut" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

describe('ToolbarCut Component', () => {
  it('renders the cut toolbar item and handles cut action on click', () => {
    render(<ToolbarCut graph={mockGraph} />);

    const cutButton = screen.getByTestId('toolbar-cut');
    expect(cutButton).toBeInTheDocument();

    fireEvent.click(cutButton);

    expect(actions.cutAction).toHaveBeenCalledWith(mockGraph);
  });
});
