import { createRoot } from 'react-dom/client';

// Mock the modules that are used
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

jest.mock('../../renderer/App', () => () => <div>Mocked App Component</div>);

describe('Root rendering', () => {
  it('renders the App component without crashing', () => {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    // Import the module after setting up the mocks
    require('../../renderer/index');

    // Assert createRoot was called with the correct container
    expect(createRoot).toHaveBeenCalledWith(container);
  });
});
