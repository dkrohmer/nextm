import { render, screen, fireEvent, within } from '@testing-library/react';
import { jest } from '@jest/globals';
import DataflowModalStride from '../../../../renderer/components/ModelEditor/DataflowModalStride';
import { setDataflowStride } from '../../../../renderer/store/modelEditor';
import '@testing-library/jest-dom';

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
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowStride: {
            spoofing: true,
            tampering: false,
            repudiation: true,
            informationDisclosure: false,
            denialOfService: false,
            elevatePrivilege: true,
          },
        },
      }),
    );

    render(<DataflowModalStride />);

    const checkboxes = [
      { key: 'spoofing', checked: true },
      { key: 'tampering', checked: false },
      { key: 'repudiation', checked: true },
      { key: 'informationDisclosure', checked: false },
      { key: 'denialOfService', checked: false },
      { key: 'elevatePrivilege', checked: true },
    ];

    checkboxes.forEach(({ key, checked }) => {
      const checkbox = within(screen.getByTestId(`checkbox-${key}`)).getByRole(
        'checkbox',
      );
      expect(checkbox).toHaveProperty('checked', checked);
    });
  });

  it('dispatches setDataflowStride action on checkbox change', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        modelEditor: {
          dataflowStride: {
            spoofing: true,
            tampering: false,
            repudiation: true,
            informationDisclosure: false,
            denialOfService: false,
            elevatePrivilege: true,
          },
        },
      }),
    );

    render(<DataflowModalStride />);

    fireEvent.click(
      within(screen.getByTestId('checkbox-tampering')).getByRole('checkbox'),
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setDataflowStride({
        spoofing: true,
        tampering: true,
        repudiation: true,
        informationDisclosure: false,
        denialOfService: false,
        elevatePrivilege: true,
      }),
    );
  });
});
