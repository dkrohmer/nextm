import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ZoneModalTrustLevelTrusted from '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelTrusted';
import { setZoneTrustLevel } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ZoneModalTrustLevelTrusted Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the radio button with the correct label and checked state', () => {
    // Set up the mock to return 'trusted' as the zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'trusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelTrusted />);

    const radioElement = screen.getByTestId('zone-trust-level-trusted-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).toHaveClass('checked'); // Verify if it's indeed a radio input
  });

  it('renders the radio button as unchecked when zoneTrustLevel is not "trusted"', () => {
    // Set up the mock to return a different zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'untrusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelTrusted />);

    // Check if the radio button is rendered and is unchecked
    const radioElement = screen.getByTestId('zone-trust-level-trusted-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).not.toHaveClass('checked');
  });

  it('dispatches setZoneTrustLevel action when the radio button is clicked', () => {
    // Set up the mock to return 'untrusted' as the initial zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'untrusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelTrusted />);

    fireEvent.click(
      within(screen.getByTestId('zone-trust-level-trusted')).getByRole('radio'),
    );

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setZoneTrustLevel('trusted'));
  });
});
