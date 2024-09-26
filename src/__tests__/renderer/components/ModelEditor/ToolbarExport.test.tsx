import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setExportModalOpen } from '../../../../renderer/store/modelEditor';
import ToolbarExport from '../../../../renderer/components/ModelEditor/ToolbarExport';
import '@testing-library/jest-dom';


const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

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

    const exportButton = screen.getByTestId('toolbar-export');
    expect(exportButton).toBeInTheDocument();

    fireEvent.click(exportButton);

    expect(mockDispatch).toHaveBeenCalledWith(setExportModalOpen(true));
  });
});
