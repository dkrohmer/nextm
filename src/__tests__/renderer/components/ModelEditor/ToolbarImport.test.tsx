import { render, screen, fireEvent } from '@testing-library/react';
import ToolbarImport from '../../../../renderer/components/ModelEditor/ToolbarImport';
import { setImportModalOpen } from '../../../../renderer/store/modelEditor';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

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

    const importButton = screen.getByTestId('toolbar-import');
    expect(importButton).toBeInTheDocument();

    fireEvent.click(importButton);

    expect(mockDispatch).toHaveBeenCalledWith(setImportModalOpen(true));
  });
});
