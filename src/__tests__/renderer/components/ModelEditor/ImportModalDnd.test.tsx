import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import ImportModalDnd from '../../../../renderer/components/ModelEditor/ImportModalDnd';
import {
  setImportError,
  setImportFileName,
  setImportIsDragging,
  setImportIsFileValid,
} from '../../../../renderer/store/modelEditor';
import '@testing-library/jest-dom';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ImportModalDnd Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelector.mockReturnValue({
      isImportModalOpen: true,
      importIsDragging: false,
      importError: null,
      importFileName: null,
      importJsonData: null,
      importIsFileValid: false,
    });

    const mockFileReader = jest.fn().mockImplementation(() => ({
      readAsText: jest.fn(function (this: FileReader) {
        if (this.onload) {
          const mockEvent = {
            target: { result: JSON.stringify({ key: 'value' }) },
          } as ProgressEvent<FileReader>;
          this.onload(mockEvent);
        }
      }),
    }));
    window.FileReader = mockFileReader as any;
  });

  it('renders the component with the correct initial state', () => {
    render(<ImportModalDnd />);
    expect(
      screen.getByText(
        'Drag and drop a JSON file here, or click to select a file.',
      ),
    ).toBeInTheDocument();
  });

  it('dispatches setImportIsDragging(true) when dragging over the area', () => {
    render(<ImportModalDnd />);
    fireEvent.dragOver(screen.getByTestId('drop-area'));
    expect(mockDispatch).toHaveBeenCalledWith(setImportIsDragging(true));
  });

  it('dispatches setImportIsDragging(false) when dragging leaves the area', () => {
    render(<ImportModalDnd />);
    fireEvent.dragLeave(screen.getByTestId('drop-area'));
    expect(mockDispatch).toHaveBeenCalledWith(setImportIsDragging(false));
  });

  it('handles file drop with valid JSON file', () => {
    const mockFile = new File([JSON.stringify({ key: 'value' })], 'test.json', {
      type: 'application/json',
    });

    render(<ImportModalDnd />);
    fireEvent.drop(screen.getByTestId('drop-area'), {
      dataTransfer: { files: [mockFile] },
    });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions[0]).toEqual(setImportIsDragging(false));
    expect(dispatchedActions[1]).toEqual({
      payload: { key: 'value' },
      type: 'modelEditor/setImportJsonData',
    });
    expect(dispatchedActions[2]).toEqual(setImportFileName('test.json'));
    expect(dispatchedActions[3]).toEqual(setImportError(null));
  });

  it('handles file drop with invalid file type', () => {
    const mockFile = new File(['Invalid content'], 'test.txt', {
      type: 'text/plain',
    });

    render(<ImportModalDnd />);
    fireEvent.drop(screen.getByTestId('drop-area'), {
      dataTransfer: { files: [mockFile] },
    });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toContainEqual(
      setImportError('Invalid file type. Only JSON files allowed.'),
    );
    expect(dispatchedActions).toContainEqual(setImportFileName(null));
    expect(dispatchedActions).toContainEqual(setImportIsFileValid(false));
  });

  it('handles file selection via input', () => {
    const mockFile = new File([JSON.stringify({ key: 'value' })], 'test.json', {
      type: 'application/json',
    });

    render(<ImportModalDnd />);
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions[0]).toEqual({
      payload: { key: 'value' },
      type: 'modelEditor/setImportJsonData',
    });
    expect(dispatchedActions[1]).toEqual(setImportFileName('test.json'));
    expect(dispatchedActions[2]).toEqual(setImportError(null));
    expect(dispatchedActions[3]).toEqual(setImportIsFileValid(true));
  });

  it('handles file drop with no files selected', () => {
    render(<ImportModalDnd />);
    fireEvent.drop(screen.getByTestId('drop-area'), {
      dataTransfer: { files: [] },
    });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toContainEqual(
      setImportError('No files selected.'),
    );
    expect(dispatchedActions).toContainEqual(setImportFileName(null));
    expect(dispatchedActions).toContainEqual(setImportIsFileValid(false));
  });

  it('handles file drop with more than one file selected', () => {
    const mockFile1 = new File(['content1'], 'file1.json', {
      type: 'application/json',
    });
    const mockFile2 = new File(['content2'], 'file2.json', {
      type: 'application/json',
    });

    render(<ImportModalDnd />);
    fireEvent.drop(screen.getByTestId('drop-area'), {
      dataTransfer: { files: [mockFile1, mockFile2] },
    });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toContainEqual(
      setImportError('Only one file allowed.'),
    );
    expect(dispatchedActions).toContainEqual(setImportFileName(null));
    expect(dispatchedActions).toContainEqual(setImportIsFileValid(false));
  });

  it('handles JSON parse error and dispatches error actions', () => {
    const mockFileReader = jest.fn().mockImplementation(() => ({
      readAsText: jest.fn(function (this: FileReader) {
        if (this.onload) {
          const mockEvent = {
            target: { result: 'invalid json' },
          } as ProgressEvent<FileReader>;
          this.onload(mockEvent);
        }
      }),
    }));
    window.FileReader = mockFileReader as any;

    const mockFile = new File(['invalid json'], 'test.json', {
      type: 'application/json',
    });

    render(<ImportModalDnd />);
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toContainEqual(
      setImportError('Error parsing JSON file'),
    );
    expect(dispatchedActions).toContainEqual(setImportFileName(null));
    expect(dispatchedActions).toContainEqual(setImportIsFileValid(false));
  });

  it('handles JSON parsing error and dispatches error actions during file drop', () => {
    const mockFile = new File(['invalid json'], 'test.json', {
      type: 'application/json',
    });

    render(<ImportModalDnd />);

    const mockFileReader = jest.fn().mockImplementation(() => ({
      readAsText: jest.fn(function (this: FileReader) {
        if (this.onload) {
          const mockEvent = {
            target: { result: 'invalid json' },
          } as ProgressEvent<FileReader>;
          this.onload(mockEvent);
        }
      }),
    }));
    window.FileReader = mockFileReader as any;

    fireEvent.drop(screen.getByTestId('drop-area'), {
      dataTransfer: { files: [mockFile] },
    });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toContainEqual(
      setImportError('Error parsing JSON file'),
    );
    expect(dispatchedActions).toContainEqual(setImportFileName(null));
    expect(dispatchedActions).toContainEqual(setImportIsFileValid(false));
  });

  it('handles invalid file type via input and dispatches error actions', () => {
    const mockFile = new File(['Invalid content'], 'test.txt', {
      type: 'text/plain',
    });

    render(<ImportModalDnd />);

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toContainEqual(
      setImportError('Invalid file type. Only JSON files allowed.'),
    );
    expect(dispatchedActions).toContainEqual(setImportFileName(null));
    expect(dispatchedActions).toContainEqual(setImportIsFileValid(false));
  });

  it('handles no file selected via input and dispatches error actions', () => {
    render(<ImportModalDnd />);

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [] } });

    const dispatchedActions = mockDispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toContainEqual(
      setImportError('No file selected. Please select a valid JSON file.'),
    );
    expect(dispatchedActions).toContainEqual(setImportFileName(null));
    expect(dispatchedActions).toContainEqual(setImportIsFileValid(false));
  });

  it('triggers file input click when clicking on the drop area', () => {
    render(<ImportModalDnd />);

    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');

    fireEvent.click(screen.getByTestId('drop-area'));

    expect(clickSpy).toHaveBeenCalled();
  });

  it('applies dragging class when importIsDragging is true', () => {
    mockUseSelector.mockReturnValueOnce({
      isImportModalOpen: true,
      importIsDragging: true,
      importError: null,
      importFileName: null,
      importJsonData: null,
      importIsFileValid: false,
    });

    render(<ImportModalDnd />);

    const dropArea = screen.getByTestId('drop-area');
    expect(dropArea).toHaveClass('drag-and-drop-area dragging');
  });

  it('does not apply dragging class when importIsDragging is false', () => {
    mockUseSelector.mockReturnValueOnce({
      isImportModalOpen: true,
      importIsDragging: false,
      importError: null,
      importFileName: null,
      importJsonData: null,
      importIsFileValid: false,
    });

    render(<ImportModalDnd />);

    const dropArea = screen.getByTestId('drop-area');
    expect(dropArea).toHaveClass('drag-and-drop-area');
    expect(dropArea).not.toHaveClass('dragging');
  });

  it('displays file message when importFileName is present', () => {
    const mockFileName = 'test.json';

    mockUseSelector.mockReturnValueOnce({
      isImportModalOpen: true,
      importIsDragging: false,
      importError: null,
      importFileName: mockFileName,
      importJsonData: null,
      importIsFileValid: false,
    });

    render(<ImportModalDnd />);

    expect(
      screen.getByText(`Selected file: ${mockFileName}`),
    ).toBeInTheDocument();
  });

  it('displays error message when importError is present', () => {
    const mockError = 'Error parsing JSON file';

    mockUseSelector.mockReturnValueOnce({
      isImportModalOpen: true,
      importIsDragging: false,
      importError: mockError,
      importFileName: null,
      importJsonData: null,
      importIsFileValid: false,
    });

    render(<ImportModalDnd />);

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });
});
