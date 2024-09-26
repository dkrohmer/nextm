import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ZoneModalTrustLevelUntrusted from '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelUntrusted';
import { setZoneTrustLevel } from '../../../../renderer/store/modelEditor';

// Mock useDispatch and useSelector hooks
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('ZoneModalTrustLevelUntrusted Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the radio button with the correct label and checked state', () => {
    // Set up the mock to return 'untrusted' as the zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'untrusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelUntrusted />);

    const radioElement = screen.getByTestId('zone-trust-level-untrusted-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).toHaveClass('checked'); // Verify if it's indeed a radio input
  });

  it('renders the radio button as unchecked when zoneTrustLevel is not "untrusted"', () => {
    // Set up the mock to return a different zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'trusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelUntrusted />);

    // Check if the radio button is rendered and is unchecked
    const radioElement = screen.getByTestId('zone-trust-level-untrusted-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).not.toHaveClass('checked');
  });

  it('dispatches setZoneTrustLevel action when the radio button is clicked', () => {
    // Set up the mock to return 'trusted' as the initial zoneTrustLevel
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'trusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelUntrusted />);

    fireEvent.click(
      within(screen.getByTestId('zone-trust-level-untrusted')).getByRole(
        'radio',
      ),
    );

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(setZoneTrustLevel('untrusted'));
  });
});
