import { render, screen } from '@testing-library/react';
import type { IModel } from '../../../../renderer/interfaces/IModel';
import Actions from '../../../../renderer/components/Model/Actions';

jest.mock(
  '../../../../renderer/components/Model/ActionsEdit',
  () =>
    function () {
      return <div>ModelActionsEdit</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Model/ActionsClone',
  () =>
    function () {
      return <div>ModelActionsClone</div>;
    },
);
jest.mock(
  '../../../../renderer/components/Model/ActionsDelete',
  () =>
    function () {
      return <div>ModelActionsDelete</div>;
    },
);

const mockModel: IModel = {
  id: '1',
  createdAt: '2024-08-23T12:00:00Z',
  name: 'Sample Model',
  incrementId: 'increment-123',
};

const mockIsVisible = true;

describe('Actions Component', () => {
  it('renders the Action components with the correct props', () => {
    render(<Actions model={mockModel} isVisible={mockIsVisible} />);

    expect(screen.getByText('ModelActionsEdit')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsClone')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsDelete')).toBeInTheDocument();
  });

  it('renders the Action components with the correct props', () => {
    render(<Actions model={mockModel} isVisible />);

    expect(screen.getByText('ModelActionsEdit')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsClone')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsDelete')).toBeInTheDocument();

    const actionsContainer = screen.getByTestId('model-actions-container');
    expect(actionsContainer).toHaveClass('visible');
  });

  it('does not apply the visible class when isVisible is false', () => {
    render(<Actions model={mockModel} isVisible={false} />);

    const actionsContainer = screen.getByTestId('model-actions-container');
    expect(actionsContainer).not.toHaveClass('visible');
  });
});
