import { render, screen } from '@testing-library/react';
import Increments from '../../../../renderer/components/Increments/index';
import useFetchProductAndIncrements from '../../../../renderer/hooks/useFetchIncrements';

// Mock the dependent components and hooks
jest.mock('../../../../renderer/hooks/useFetchIncrements');
jest.mock('../../../../renderer/components/Increments/Loader', () => () => <div>Loader Component</div>);
jest.mock('../../../../renderer/components/Increments/Error', () => () => <div>Error Component</div>);
jest.mock('../../../../renderer/components/Increments/Empty', () => () => <div>Empty Component</div>);
jest.mock('../../../../renderer/components/Increments/Accordion', () => () => <div>Accordion Component</div>);
jest.mock('../../../../renderer/components/Increments/Add', () => () => <div>Add Component</div>);
jest.mock('../../../../renderer/components/Increments/Modal', () => () => <div>Modal Component</div>);
jest.mock('../../../../renderer/components/Increments/ConfirmDelete', () => () => <div>ConfirmDelete Component</div>);
jest.mock('../../../../renderer/components/Increments/Title', () => () => <div>Title Component</div>);

describe('Increments Component', () => {
  beforeEach(() => {
    // Mock the hook behavior
    (useFetchProductAndIncrements as jest.Mock).mockImplementation(() => {});
  });

  it('should render the Title and Add components', () => {
    render(<Increments />);
    
    // Check if Title and Add components are rendered
    expect(screen.getByText('Title Component')).toBeInTheDocument();
    expect(screen.getByText('Add Component')).toBeInTheDocument();
  });

  it('should render the Loader, Error, Empty, and Accordion components', () => {
    render(<Increments />);

    // Check if all the components are rendered
    expect(screen.getByText('Loader Component')).toBeInTheDocument();
    expect(screen.getByText('Error Component')).toBeInTheDocument();
    expect(screen.getByText('Empty Component')).toBeInTheDocument();
    expect(screen.getByText('Accordion Component')).toBeInTheDocument();
  });

  it('should render the Modal and ConfirmDelete components', () => {
    render(<Increments />);

    // Check if Modal and ConfirmDelete components are rendered
    expect(screen.getByText('Modal Component')).toBeInTheDocument();
    expect(screen.getByText('ConfirmDelete Component')).toBeInTheDocument();
  });
});
