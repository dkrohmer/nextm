import { render, screen, fireEvent, within } from '@testing-library/react';
import { jest } from '@jest/globals';
import { setZoneTrustLevel } from '../../../../renderer/store/modelEditor';
import ZoneModalTrustLevelEmpty from '../../../../renderer/components/ModelEditor/ZoneModalTrustLevelEmpty';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: '',
        },
      }),
    );

    render(<ZoneModalTrustLevelEmpty />);

    const radioElement = screen.getByTestId('zone-trust-level-empty-radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).toHaveClass('checked');
  });

  it('renders the radio button as unchecked when zoneTrustLevel is not empty', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          zoneTrustLevel: 'trusted',
        },
      }),
    );

    render(<ZoneModalTrustLevelEmpty />);

    const radioElement = screen.getByTestId('zone-trust-level-empty-radio');
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

    render(<ZoneModalTrustLevelEmpty />);

    fireEvent.click(
      within(screen.getByTestId('zone-trust-level-empty')).getByRole('radio'),
    );

    expect(mockDispatch).toHaveBeenCalledWith(setZoneTrustLevel(''));
  });
});
