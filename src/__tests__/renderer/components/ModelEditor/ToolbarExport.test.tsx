import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ToolbarExport from '../../../../renderer/components/ModelEditor/ToolbarExport';
import { setExportModalOpen } from '../../../../renderer/store/modelEditor';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-export" onClick={onClick}>
        {children}
      </button>
    )),
  },
}));

describe('ToolbarExport Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the export toolbar item and handles export action on click', () => {
    render(<ToolbarExport />);

    // Check if the toolbar item is rendered
    const exportButton = screen.getByTestId('toolbar-export');
    expect(exportButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(exportButton);

    // Verify that the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setExportModalOpen(true));
  });
});
