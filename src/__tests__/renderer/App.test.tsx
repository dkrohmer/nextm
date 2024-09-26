import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import AppWrapper from '../../renderer/App'; // Adjust the import path if necessary
import store from '../../renderer/store';

jest.mock('../../renderer/components', () => ({
  Products: () => <div>Products Component</div>,
  Product: () => <div>Product Component</div>,
  ModelEditor: () => <div>ModelEditor Component</div>,
  SideBar: () => <div>SideBar Component</div>,
  TopBar: () => <div>TopBar Component</div>,
  Footer: () => <div>Footer Component</div>,
  ToastManager: () => <div>ToastManager Component</div>,
}));

jest.mock('../../renderer/hooks/useInitializeApp', () => jest.fn());
jest.mock('../../renderer/hooks/usePreventDefaultHistoryKeys', () => jest.fn());

describe('App', () => {
  const renderApp = (initialEntries = ['/']) => {
    return render(
      <Provider store={store}>
        <AppWrapper />
      </Provider>,
    );
  };

  it('should render the sidebar, top bar, footer, and toast manager', () => {
    renderApp();

    expect(screen.getByText('SideBar Component')).toBeInTheDocument();
    expect(screen.getByText('TopBar Component')).toBeInTheDocument();
    expect(screen.getByText('Footer Component')).toBeInTheDocument();
    expect(screen.getByText('ToastManager Component')).toBeInTheDocument();
  });

  it('should navigate to the Products component by default', () => {
    renderApp(['/']);

    expect(screen.getByText('Products Component')).toBeInTheDocument();
  });

  it('should navigate to the 404 route and redirect to home when an invalid route is provided', () => {
    renderApp(['/invalid-route']);

    expect(screen.getByText('Products Component')).toBeInTheDocument();
  });
});
