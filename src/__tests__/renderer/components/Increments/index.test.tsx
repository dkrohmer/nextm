import { render, screen } from '@testing-library/react';
import Increments from '../../../../renderer/components/Increments/index';
import useFetchProductAndIncrements from '../../../../renderer/hooks/useFetchIncrements';

jest.mock('../../../../renderer/hooks/useFetchIncrements');
jest.mock(
  '../../../../renderer/components/Increments/Loader',
  () =>
    function () {
      return <div>Loader Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments/Error',
  () =>
    function () {
      return <div>Error Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments/Empty',
  () =>
    function () {
      return <div>Empty Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments/Accordion',
  () =>
    function () {
      return <div>Accordion Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments/Add',
  () =>
    function () {
      return <div>Add Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments/Modal',
  () =>
    function () {
      return <div>Modal Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments/ConfirmDelete',
  () =>
    function () {
      return <div>ConfirmDelete Component</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Increments/Title',
  () =>
    function () {
      return <div>Title Component</div>;
    },
);

describe('Increments Component', () => {
  beforeEach(() => {
    (useFetchProductAndIncrements as jest.Mock).mockImplementation(() => {});
  });

  it('should render the Title and Add components', () => {
    render(<Increments />);

    expect(screen.getByText('Title Component')).toBeInTheDocument();
    expect(screen.getByText('Add Component')).toBeInTheDocument();
  });

  it('should render the Loader, Error, Empty, and Accordion components', () => {
    render(<Increments />);

    expect(screen.getByText('Loader Component')).toBeInTheDocument();
    expect(screen.getByText('Error Component')).toBeInTheDocument();
    expect(screen.getByText('Empty Component')).toBeInTheDocument();
    expect(screen.getByText('Accordion Component')).toBeInTheDocument();
  });

  it('should render the Modal and ConfirmDelete components', () => {
    render(<Increments />);

    expect(screen.getByText('Modal Component')).toBeInTheDocument();
    expect(screen.getByText('ConfirmDelete Component')).toBeInTheDocument();
  });
});
