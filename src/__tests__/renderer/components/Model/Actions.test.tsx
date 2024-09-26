import React from 'react';
import { render, screen } from '@testing-library/react';
import Actions from '../../../../renderer/components/Model/Actions'; // Updated import path
import ModelActionsEdit from '../../../../renderer/components/Model/ActionsEdit'; // Updated import path
import ModelActionsClone from '../../../../renderer/components/Model/ActionsClone'; // Updated import path
import ModelActionsDelete from '../../../../renderer/components/Model/ActionsDelete'; // Updated import path
import type { IModel } from '../../../../renderer/interfaces/IModel'; // Updated import path

// Mock the child components
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

// Sample model data
const mockModel: IModel = {
  id: '1',
  createdAt: '2024-08-23T12:00:00Z',
  name: 'Sample Model',
  incrementId: 'increment-123',
};

const mockIsVisible = true;

describe('Actions Component', () => {
  it('renders the Action components with the correct props', () => {
    // Render the Actions component
    render(<Actions model={mockModel} isVisible={mockIsVisible} />);

    // Verify that the child components are rendered
    expect(screen.getByText('ModelActionsEdit')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsClone')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsDelete')).toBeInTheDocument();
  });

  it('renders the Action components with the correct props', () => {
    // Render the Actions component with isVisible as true
    render(<Actions model={mockModel} isVisible />);

    // Verify that the child components are rendered
    expect(screen.getByText('ModelActionsEdit')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsClone')).toBeInTheDocument();
    expect(screen.getByText('ModelActionsDelete')).toBeInTheDocument();

    // Verify that the 'visible' class is applied when isVisible is true
    const actionsContainer = screen.getByTestId('model-actions-container');
    expect(actionsContainer).toHaveClass('visible');
  });

  it('does not apply the visible class when isVisible is false', () => {
    // Render the Actions component with isVisible as false
    render(<Actions model={mockModel} isVisible={false} />);

    // Verify that the 'visible' class is not applied when isVisible is false
    const actionsContainer = screen.getByTestId('model-actions-container');
    expect(actionsContainer).not.toHaveClass('visible');
  });
});
