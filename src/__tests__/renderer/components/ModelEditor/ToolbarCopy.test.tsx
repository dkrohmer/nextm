import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarCopy from '../../../../renderer/components/ModelEditor/ToolbarCopy';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  copyAction: jest.fn(),
}));

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-copy" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

describe('ToolbarCopy Component', () => {
  it('renders the copy toolbar item and handles copy action on click', () => {
    render(<ToolbarCopy graph={mockGraph} />);

    const copyButton = screen.getByTestId('toolbar-copy');
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(actions.copyAction).toHaveBeenCalledWith(mockGraph);
  });
});
