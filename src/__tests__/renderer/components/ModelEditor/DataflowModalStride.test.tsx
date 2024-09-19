import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataflowModalStride from '../../../../renderer/components/ModelEditor/DataflowModalStride'; // Adjust the import path if necessary
import { setDataflowStride } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('DataflowModalStride Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkboxes based on dataflowStride values', () => {
    // Set up the mock to return a specific dataflowStride state
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowStride: {
          spoofing: true,
          tampering: false,
          repudiation: true,
          informationDisclosure: false,
          denialOfService: false,
          elevatePrivilege: true,
        },
      }
    }));

    render(<DataflowModalStride />);

    // Check if checkboxes are rendered with correct labels and checked state
    const checkboxes = [
      { key: 'spoofing', checked: true },
      { key: 'tampering', checked: false },
      { key: 'repudiation', checked: true },
      { key: 'informationDisclosure', checked: false },
      { key: 'denialOfService', checked: false },
      { key: 'elevatePrivilege', checked: true },
    ];

    checkboxes.forEach(({ key, checked }) => {
      const checkbox = within(screen.getByTestId(`checkbox-${key}`)).getByRole('checkbox');
      expect(checkbox).toHaveProperty('checked', checked);
    });
  });

  it('dispatches setDataflowStride action on checkbox change', () => {
    // Set up the mock to return a specific dataflowStride state
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        dataflowStride: {
          spoofing: true,
          tampering: false,
          repudiation: true,
          informationDisclosure: false,
          denialOfService: false,
          elevatePrivilege: true,
        },
      }
    }));

    render(<DataflowModalStride />);

    // Simulate checkbox change for "tampering"
    fireEvent.click(within(screen.getByTestId('checkbox-tampering')).getByRole('checkbox'));

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setDataflowStride({
      spoofing: true,
      tampering: true, // toggled
      repudiation: true,
      informationDisclosure: false,
      denialOfService: false,
      elevatePrivilege: true,
    }));
  });
});
