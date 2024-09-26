import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import ModalResponsible from '../../../../renderer/components/Products/ModalResponsible';
import '@testing-library/jest-dom';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

jest.mock(
  '../../../../renderer/components/Products/ModalResponsibleFirstName',
  () =>
    function () {
      return <div>First Name Field</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Products/ModalResponsibleLastName',
  () =>
    function () {
      return <div>Last Name Field</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Products/ModalResponsibleRole',
  () =>
    function () {
      return <div>Role Field</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Products/ModalResponsibleRemoveButton',
  () =>
    function () {
      return <button>Remove</button>;
    },
);
jest.mock(
  '../../../../renderer/components/Products/ModalResponsibleAddButton',
  () =>
    function () {
      return <button>Add Responsible</button>;
    },
);

describe('ModalResponsible Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list of responsibles when present', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            responsibles: [
              { id: '1', firstName: 'John', lastName: 'Doe', role: 'Manager' },
              {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                role: 'Developer',
              },
            ],
          },
        },
      }),
    );

    render(<ModalResponsible />);

    expect(screen.getAllByText('First Name Field')).toHaveLength(2);
    expect(screen.getAllByText('Last Name Field')).toHaveLength(2);
    expect(screen.getAllByText('Role Field')).toHaveLength(2);
    expect(screen.getAllByText('Remove')).toHaveLength(2);
    expect(screen.getByText('Add Responsible')).toBeInTheDocument();
  });

  it('renders no responsible fields if none are present', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            responsibles: [],
          },
        },
      }),
    );

    render(<ModalResponsible />);

    expect(screen.queryByText('First Name Field')).not.toBeInTheDocument();
    expect(screen.queryByText('Last Name Field')).not.toBeInTheDocument();
    expect(screen.queryByText('Role Field')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
    expect(screen.getByText('Add Responsible')).toBeInTheDocument();
  });

  it('renders the "Add Responsible" button', () => {
    mockUseSelector.mockImplementation((selector: any) =>
      selector({
        products: {
          productsCurrentProduct: {
            id: '1',
            name: 'Test Product',
            responsibles: [],
          },
        },
      }),
    );

    render(<ModalResponsible />);

    expect(screen.getByText('Add Responsible')).toBeInTheDocument();
  });
});
