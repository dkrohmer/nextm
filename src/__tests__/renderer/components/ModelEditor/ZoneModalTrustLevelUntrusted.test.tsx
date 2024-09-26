import { render, screen, fireEvent, within } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setZoneTrustLevel } from '../../../../renderer/store/modelEditor';
import ZoneModalTrustLevelUntrusted from '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelUntrusted';
import '@testing-library/jest-dom';

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
    expect(radioElement).toHaveClass('checked');
  });

  it('renders the radio button as unchecked when zoneTrustLevel is not "untrusted"', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'trusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelUntrusted />);

    const radioElement = screen.getByTestId('zone-trust-level-untrusted-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).not.toHaveClass('checked');
  });

  it('dispatches setZoneTrustLevel action when the radio button is clicked', () => {
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

    expect(mockDispatch).toHaveBeenCalledWith(setZoneTrustLevel('untrusted'));
  });
});
