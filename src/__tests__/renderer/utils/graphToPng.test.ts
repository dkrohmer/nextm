import { Graph } from '@antv/x6';
import { graphToPng } from '../../../renderer/utils/graphToPng'; // Adjust the import path as necessary

jest.mock('@antv/x6', () => ({
  Graph: jest.fn().mockImplementation(() => ({
    toPNG: jest.fn(),
  })),
}));

describe('graphToPng', () => {
  let graphMock: jest.Mocked<Graph>;

  beforeEach(() => {
    graphMock = new Graph({}) as jest.Mocked<Graph>;
    jest.clearAllMocks();
  });

  it('should resolve with the PNG data URI when toPNG is successful', async () => {
    const mockDataUri = 'data:image/png;base64,mockDataUri';
    
    graphMock.toPNG.mockImplementation((callback) => {
      callback(mockDataUri);
    });

    const result = await graphToPng(graphMock);

    expect(graphMock.toPNG).toHaveBeenCalledWith(expect.any(Function), {
      padding: { left: 25, right: 25, top: 25, bottom: 25 },
      quality: 1,
      width: 150,
      height: 125,
    });
    expect(result).toBe(mockDataUri);
  });

  it('should reject with an error if toPNG returns no data URI', async () => {
    graphMock.toPNG.mockImplementation((callback) => {
      callback('');
    });

    await expect(graphToPng(graphMock)).rejects.toThrow('Failed to generate PNG data URI');
  });

  it('should reject with an error if toPNG throws an exception', async () => {
    graphMock.toPNG.mockImplementation(() => {
      throw new Error('Some error');
    });

    await expect(graphToPng(graphMock)).rejects.toThrow('Some error');
  });
});
