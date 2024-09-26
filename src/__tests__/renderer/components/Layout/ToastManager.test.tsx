import { render, screen } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import ToastManager from '../../../../renderer/components/Layout/ToastManager';
import useToastNotifications from '../../../../renderer/hooks/useToastNotifications';

// Mock the `useToastNotifications` hook
jest.mock('../../../../renderer/hooks/useToastNotifications', () => jest.fn());

// Mock the `Toaster` component
jest.mock('react-hot-toast', () => ({
  Toaster: jest.fn(() => <div>Toaster Component</div>),
}));

describe('ToastManager Component', () => {
  it('renders the Toaster component and calls useToastNotifications', () => {
    // Render the ToastManager component
    render(<ToastManager />);

    // Check if the useToastNotifications hook was called
    expect(useToastNotifications).toHaveBeenCalled();

    // Check if the Toaster component is rendered
    expect(screen.getByText('Toaster Component')).toBeInTheDocument();
  });

  it('renders the Toaster component with the correct position', () => {
    // Render the ToastManager component
    render(<ToastManager />);

    // Verify that the Toaster component was rendered with the correct position prop
    expect(Toaster).toHaveBeenCalledWith(
      expect.objectContaining({
        position: 'top-center',
      }),
      {},
    );
  });
});
