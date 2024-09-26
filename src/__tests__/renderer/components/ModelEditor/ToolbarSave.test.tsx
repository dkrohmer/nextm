import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graph as x6Graph } from '@antv/x6';
import { useParams } from 'react-router-dom';
import ToolbarSave from '../../../../renderer/components/ModelEditor/ToolbarSave';
import { saveModel } from '../../../../renderer/utils/saveModel';

// Mock the `saveModel` utility function
jest.mock('../../../../renderer/utils/saveModel', () => ({
  saveModel: jest.fn(),
}));

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-save" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ToolbarSave Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mocking useParams to return a specific modelId
    (useParams as jest.Mock).mockReturnValue({ modelId: 'testModelId' });
  });

  it('renders the save toolbar item and handles save action on click', () => {
    // Mock useSelector to return the latestVersion state
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        versions: {
          latestVersion: { id: 'latestVersionId', payload: 'somePayload' },
        },
      }),
    );

    render(<ToolbarSave graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const saveButton = screen.getByTestId('toolbar-save');
    expect(saveButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(saveButton);

    // Verify that the saveModel function was called with the correct arguments
    expect(saveModel).toHaveBeenCalledWith(
      'testModelId',
      mockGraph,
      { id: 'latestVersionId', payload: 'somePayload' },
      mockDispatch,
    );
  });
});
