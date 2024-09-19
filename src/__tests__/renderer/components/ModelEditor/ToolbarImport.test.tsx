import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolbarImport from '../../../../renderer/components/ModelEditor/ToolbarImport';
import { setImportModalOpen } from '../../../../renderer/store/modelEditor';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-import" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarImport Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the import toolbar item and handles import action on click', () => {
    render(<ToolbarImport />);

    // Check if the toolbar item is rendered
    const importButton = screen.getByTestId('toolbar-import');
    expect(importButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(importButton);

    // Verify that the import modal open action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(setImportModalOpen(true));
  });
});
