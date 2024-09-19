import { Rectangle } from '@antv/x6';
import { saveModel } from '../../../renderer/utils/saveModel';
import { addLatestVersion, fetchLatestVersion } from '../../../renderer/services/api/versions';
import { showToast } from '../../../renderer/store/settings';
import { compareGraphHashes } from '../../../renderer/utils/compareGraphHashes';
import { Graph } from '@antv/x6';
import { AppDispatch } from '../../../renderer/store';

// Mock Redux store and actions
jest.mock('../../../renderer/services/api/versions', () => ({
  addLatestVersion: jest.fn(),
  fetchLatestVersion: jest.fn(),
}));

jest.mock('../../../renderer/store/settings', () => ({
  showToast: jest.fn(),
}));

jest.mock('../../../renderer/utils/compareGraphHashes', () => ({
  compareGraphHashes: jest.fn(),
}));

jest.mock('@antv/x6', () => ({
  Graph: jest.fn().mockImplementation(() => ({
    toJSON: jest.fn(),
    getGraphArea: jest.fn(),
  })),
  Rectangle: jest.fn(),
}));

describe('saveModel', () => {
  let graphMock: jest.Mocked<Graph>;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn(() => ({
      unwrap: jest.fn().mockResolvedValue(Promise.resolve()),
    }));
    graphMock = new Graph({}) as jest.Mocked<Graph>;
    jest.clearAllMocks();
  });

  it('should save the model with correct graph area values', async () => {
    const latestVersion = { payload: { cells: [{ id: '1' }] } };
    graphMock.toJSON.mockReturnValue({ cells: [{ id: '2' }] });

    const mockRectangle = new Rectangle(10, 20, 100, 200);
    graphMock.getGraphArea.mockReturnValue(mockRectangle); // This sets up the mocked return value

    await saveModel('model-id', graphMock, latestVersion, dispatch);

    expect(graphMock.getGraphArea).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      addLatestVersion({
        modelId: 'model-id',
        graph: graphMock,
        x: 10,
        y: 20,
        height: 100,
        width: 200,
      })
    );
  });

  it('should return early if oldGraph is falsy', async () => {
    const latestVersion = { payload: { cells: null } }; // `oldGraph` is falsy
    graphMock.toJSON.mockReturnValue({ cells: [{ id: '2' }] }); // `newGraph` is valid
  
    await saveModel('model-id', graphMock, latestVersion, dispatch);
  
    expect(dispatch).not.toHaveBeenCalled(); // Ensure dispatch was not called
  });  
});

describe('saveModel and compareGraphHashes', () => {
  let graphMock: jest.Mocked<Graph>;
  let dispatchMock: jest.MockedFunction<AppDispatch>;

  beforeEach(() => {
    graphMock = {
      toJSON: jest.fn().mockReturnValue({ cells: [{ id: '2' }] }),
      getGraphArea: jest.fn().mockReturnValue({
        x: 0,
        y: 0,
        height: 100,
        width: 100,
      } as Partial<Rectangle>),
    } as unknown as jest.Mocked<Graph>;

    dispatchMock = jest.fn();
    jest.clearAllMocks();
  });

  it('should return early if compareGraphHashes returns true', async () => {
    // Mock compareGraphHashes to return true
    (compareGraphHashes as jest.Mock).mockReturnValue(true);

    const latestVersion = { payload: { cells: [{ id: '1' }] } };

    // Call saveModel
    await saveModel('model-id', graphMock, latestVersion, dispatchMock);

    // Ensure compareGraphHashes was called
    expect(compareGraphHashes).toHaveBeenCalledWith([{ id: '1' }], [{ id: '2' }]);

    // Ensure no further actions (like dispatching) occur after early return
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});