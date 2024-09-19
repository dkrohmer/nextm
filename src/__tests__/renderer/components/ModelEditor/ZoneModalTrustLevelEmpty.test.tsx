import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZoneModalTrustLevelEmpty from '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelEmpty';
import { setZoneTrustLevel } from '../../../../renderer/store/modelEditor';
import { jest } from '@jest/globals';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ZoneModalTrustLevelEmpty Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the radio button with the correct label and checked state', () => {
    // Set up the mock to return an empty zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        zoneTrustLevel: '',
      },
    }));

    render(<ZoneModalTrustLevelEmpty />);
    
    const radioElement = screen.getByTestId('zone-trust-level-empty-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).toHaveClass('checked'); // Verify if it's indeed a radio input
  });

  it('renders the radio button as unchecked when zoneTrustLevel is not empty', () => {
    // Set up the mock to return a non-empty zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        zoneTrustLevel: 'trusted',
      },
    }));

    render(<ZoneModalTrustLevelEmpty />);

    // Check if the radio button is rendered and is unchecked
    const radioElement = screen.getByTestId('zone-trust-level-empty-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).not.toHaveClass('checked');
  });

  it('dispatches setZoneTrustLevel action when the radio button is clicked', () => {
    // Set up the mock to return a non-empty zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) => selector({
      modelEditor: {
        zoneTrustLevel: 'trusted',
      },
    }));

    render(<ZoneModalTrustLevelEmpty />);

    fireEvent.click(within(screen.getByTestId('zone-trust-level-empty')).getByRole('radio'));

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setZoneTrustLevel(''));
  });
});
