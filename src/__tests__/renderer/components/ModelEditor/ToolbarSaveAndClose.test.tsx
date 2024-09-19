import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolbarSaveAndClose from '../../../../renderer/components/ModelEditor/ToolbarSaveAndClose';
import { saveModel } from '../../../../renderer/utils/saveModel';
import { Graph as x6Graph } from '@antv/x6';
import { useNavigate, useParams } from 'react-router-dom';

// Mock the `saveModel` utility function
jest.mock('../../../../renderer/utils/saveModel', () => ({
  saveModel: jest.fn(),
}));

// Mock the useParams and useNavigate hooks
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Create a mock Graph instance
const mockGraph = new x6Graph({
  container: document.createElement('div'),
});

// Mock the Toolbar.Item component from @antv/x6-react-components
jest.mock('@antv/x6-react-components', () => ({
  Toolbar: {
    Item: jest.fn(({ onClick, children }) => (
      <button data-testid="toolbar-save-and-close" onClick={onClick}>
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

describe('ToolbarSaveAndClose Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mocking useParams to return specific IDs
    (useParams as jest.Mock).mockReturnValue({
      productId: 'testProductId',
      incrementId: 'testIncrementId',
      modelId: 'testModelId',
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders the save and close toolbar item and handles save and navigate on click', async () => {
    // Mock useSelector to return the latestVersion state
    mockUseSelector.mockImplementation((selector: any) => selector({
      versions: {
        latestVersion: { id: 'latestVersionId', payload: 'somePayload' },
      },
    }));

    render(<ToolbarSaveAndClose graph={mockGraph} />);

    // Check if the toolbar item is rendered
    const saveAndCloseButton = screen.getByTestId('toolbar-save-and-close');
    expect(saveAndCloseButton).toBeInTheDocument();

    // Simulate a click on the toolbar item
    fireEvent.click(saveAndCloseButton);

    // Verify that the saveModel function was called with the correct arguments
    expect(saveModel).toHaveBeenCalledWith(
      'testModelId',
      mockGraph,
      { id: 'latestVersionId', payload: 'somePayload' },
      mockDispatch
    );
  });
});
