import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import ToolbarDelete from '../../../../renderer/components/ModelEditor/ToolbarDelete';
import actions from '../../../../renderer/services/model-editor/actions';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/services/model-editor/actions', () => ({
  deleteAction: jest.fn(),
}));

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-delete" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

describe('ToolbarDelete Component', () => {
  it('renders the delete toolbar item and handles delete action on click', () => {
    render(<ToolbarDelete graph={mockGraph} />);

    const deleteButton = screen.getByTestId('toolbar-delete');
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(actions.deleteAction).toHaveBeenCalledWith(mockGraph);
  });
});
