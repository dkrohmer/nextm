import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import settingsReducer from '../../../../renderer/store/settings';
import ExplicitObjectSelection from '../../../../renderer/components/Settings/ExplicitObjectSelection';
import windowElectron from '../../../../../mocks/window-electron';

window.electron = windowElectron


// Mock useSelector and useDispatch hooks
const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
  useDispatch: () => mockDispatch,
}));

describe('ExplicitObjectSelection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the explicit object selection section and info popup', async () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          explicitObjectSelection: false,
        },
      })
    );
    
    render(<ExplicitObjectSelection />);

    // Check for the settings label
    expect(screen.getByText('Set explicit object selection')).toBeInTheDocument();

    // Check for the info icon
    const infoIcon = screen.getByTestId('info-icon');
    expect(infoIcon).toBeInTheDocument();

    // Simulate mouse hover on the info icon to trigger the popup
    fireEvent.mouseEnter(infoIcon);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).toBeInTheDocument();
      expect(
        screen.getByText(
          'If explicit object selection is active, you cannot context-click an object unless it has previously been selected with a left mouse click.'
        )
      ).toBeInTheDocument();
    });

    // Simulate mouse leave to hide the popup
    fireEvent.mouseLeave(infoIcon);

    await waitFor(() => {
      const popup = document.querySelector('.ui.popup.visible');
      expect(popup).not.toBeInTheDocument();
    });
  });

  it('sets explicit object selection to active when inactive checkbox is clicked', () => {
    // Mock useSelector to return gridVisible as 'none'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          explicitObjectSelection: false,
        },
      })
    );

    // Render the component
    render(<ExplicitObjectSelection />);

    // Check if the checkbox is rendered
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();

    // set checkbox to active
    fireEvent.click(within(checkbox).getByRole('checkbox'));
    expect(window.electron.setExplicitObjectSelection).toHaveBeenCalledWith(true);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setExplicitObjectSelection', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'settings/showToast',
      payload: expect.objectContaining({
        successMessage: 'Explicit object selection active',
      }),
    }));
  });

  it('sets explicit object selection to inactive when active checkbox is clicked', () => {
    // Mock useSelector to return gridVisible as 'none'
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        settings: {
          explicitObjectSelection: true,
        },
      })
    );

    // Render the component
    render(<ExplicitObjectSelection />);

    // Check if the checkbox is rendered
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();

    // set checkbox to active
    fireEvent.click(within(checkbox).getByRole('checkbox'));
    expect(window.electron.setExplicitObjectSelection).toHaveBeenCalledWith(false);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'settings/setExplicitObjectSelection', payload: false });
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'settings/showToast',
      payload: expect.objectContaining({
        successMessage: 'Explicit object selection inactive',
      }),
    }));
  });
});
