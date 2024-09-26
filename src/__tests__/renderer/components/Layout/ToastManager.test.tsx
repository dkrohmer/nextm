import { render, screen } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import ToastManager from '../../../../renderer/components/Layout/ToastManager';
import useToastNotifications from '../../../../renderer/hooks/useToastNotifications';

jest.mock('../../../../renderer/hooks/useToastNotifications', () => jest.fn());

jest.mock('react-hot-toast', () => ({
  Toaster: jest.fn(() => <div>Toaster Component</div>),
}));

describe('ToastManager Component', () => {
  it('renders the Toaster component and calls useToastNotifications', () => {
    render(<ToastManager />);

    expect(useToastNotifications).toHaveBeenCalled();
    expect(screen.getByText('Toaster Component')).toBeInTheDocument();
  });

  it('renders the Toaster component with the correct position', () => {
    render(<ToastManager />);

    expect(Toaster).toHaveBeenCalledWith(
      expect.objectContaining({
        position: 'top-center',
      }),
      {},
    );
  });
});
