import { render, screen, fireEvent } from '@testing-library/react';
import { Graph as x6Graph } from '@antv/x6';
import { useNavigate, useParams } from 'react-router-dom';
import { saveModel } from '../../../../renderer/utils/saveModel';
import ToolbarSaveAndClose from '../../../../renderer/components/ModelEditor/ToolbarSaveAndClose';
import '@testing-library/jest-dom';


jest.mock('../../../../renderer/utils/saveModel', () => ({
  saveModel: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-save-and-close" onClick={onClick}>
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

describe('ToolbarSaveAndClose Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({
      productId: 'testProductId',
      incrementId: 'testIncrementId',
      modelId: 'testModelId',
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders the save and close toolbar item and handles save and navigate on click', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        versions: {
          latestVersion: { id: 'latestVersionId', payload: 'somePayload' },
        },
      }),
    );

    render(<ToolbarSaveAndClose graph={mockGraph} />);

    const saveAndCloseButton = screen.getByTestId('toolbar-save-and-close');
    expect(saveAndCloseButton).toBeInTheDocument();

    fireEvent.click(saveAndCloseButton);

    expect(saveModel).toHaveBeenCalledWith(
      'testModelId',
      mockGraph,
      { id: 'latestVersionId', payload: 'somePayload' },
      mockDispatch,
    );
  });
});
