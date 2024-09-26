import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import { useParams } from 'react-router-dom';
import { saveModel } from '../../../../renderer/utils/saveModel';
import ToolbarSave from '../../../../renderer/components/ModelEditor/ToolbarSave';
import '@testing-library/jest-dom';

jest.mock('../../../../renderer/utils/saveModel', () => ({
  saveModel: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-save" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ToolbarSave Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ modelId: 'testModelId' });
  });

  it('renders the save toolbar item and handles save action on click', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        versions: {
          latestVersion: { id: 'latestVersionId', payload: 'somePayload' },
        },
      }),
    );

    render(<ToolbarSave graph={mockGraph} />);

    const saveButton = screen.getByTestId('toolbar-save');
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);

    expect(saveModel).toHaveBeenCalledWith(
      'testModelId',
      mockGraph,
      { id: 'latestVersionId', payload: 'somePayload' },
      mockDispatch,
    );
  });
});
