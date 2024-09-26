import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

jest.mock(
  '../../renderer/App',
  () =>
    function () {
      return <div>Mocked App Component</div>;
    },
);

describe('Root rendering', () => {
  it('renders the App component without crashing', () => {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    require('../../renderer/index');

    expect(createRoot).toHaveBeenCalledWith(container);
  });
});
