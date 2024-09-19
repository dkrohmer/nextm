import actions from '../../../../renderer/services/model-editor/actions'; // update this to the correct path
import { Cell, Graph } from '@antv/x6';

describe('Graph actions', () => {
  let graph: jest.Mocked<Graph>;

  beforeEach(() => {
    // Create a mock Graph object
    graph = {
      zoomToFit: jest.fn(),
      zoom: jest.fn(),
      canUndo: jest.fn(),
      undo: jest.fn(),
      canRedo: jest.fn(),
      redo: jest.fn(),
      getCells: jest.fn(),
      select: jest.fn(),
      getSelectedCells: jest.fn(),
      cut: jest.fn(),
      copy: jest.fn(),
      isClipboardEmpty: jest.fn(),
      paste: jest.fn(),
      cleanSelection: jest.fn(),
      removeCells: jest.fn(),
    } as any;
  });

  it('fitViewAction should call zoomToFit with padding', () => {
    const result = actions.fitViewAction(graph);
    expect(graph.zoomToFit).toHaveBeenCalledWith({ padding: { left: 200, right: 200 } });
    expect(result).toBe(true);
  });

  it('zoomInAction should zoom in by 0.2', () => {
    const result = actions.zoomInAction(graph);
    expect(graph.zoom).toHaveBeenCalledWith(0.2);
    expect(result).toBe(true);
  });

  it('zoomOutAction should zoom out by -0.2', () => {
    const result = actions.zoomOutAction(graph);
    expect(graph.zoom).toHaveBeenCalledWith(-0.2);
    expect(result).toBe(true);
  });

  it('undoAction should call undo if canUndo is true', () => {
    graph.canUndo.mockReturnValue(true);
    const result = actions.undoAction(graph);
    expect(graph.canUndo).toHaveBeenCalled();
    expect(graph.undo).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('undoAction should return false if canUndo is false', () => {
    graph.canUndo.mockReturnValue(false);
    const result = actions.undoAction(graph);
    expect(graph.canUndo).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('redoAction should call redo if canRedo is true', () => {
    graph.canRedo.mockReturnValue(true);
    const result = actions.redoAction(graph);
    expect(graph.canRedo).toHaveBeenCalled();
    expect(graph.redo).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('redoAction should return false if canRedo is false', () => {
    graph.canRedo.mockReturnValue(false);
    const result = actions.redoAction(graph);
    expect(graph.canRedo).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('selectAllAction should select all cells if any exist', () => {
    const mockCells = [new Cell(), new Cell()];
    graph.getCells.mockReturnValue(mockCells);
    
    const result = actions.selectAllAction(graph);
    expect(graph.getCells).toHaveBeenCalled();
    expect(graph.select).toHaveBeenCalledWith(mockCells);
    expect(result).toBe(true);
  });

  it('selectAllAction should return false if no cells exist', () => {
    graph.getCells.mockReturnValue([]);
    const result = actions.selectAllAction(graph);
    expect(graph.getCells).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('cutAction should cut selected cells if any exist', () => {
    const selectedCells = [new Cell()]; // Create mock Cell instances for selected cells
    graph.getSelectedCells.mockReturnValue(selectedCells);
    
    const result = actions.cutAction(graph);
    expect(graph.getSelectedCells).toHaveBeenCalled();
    expect(graph.cut).toHaveBeenCalledWith(selectedCells);
    expect(result).toBe(true);
  });

  it('cutAction should return false if no cells are selected', () => {
    graph.getSelectedCells.mockReturnValue([]);
    const result = actions.cutAction(graph);
    expect(graph.getSelectedCells).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('copyAction should copy selected cells if any exist', () => {
    const selectedCells = [new Cell()];
    graph.getSelectedCells.mockReturnValue(selectedCells);
    const result = actions.copyAction(graph);
    expect(graph.getSelectedCells).toHaveBeenCalled();
    expect(graph.copy).toHaveBeenCalledWith(selectedCells);
    expect(result).toBe(true);
  });

  it('copyAction should return false if no cells are selected', () => {
    graph.getSelectedCells.mockReturnValue([]);
    const result = actions.copyAction(graph);
    expect(graph.getSelectedCells).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('pasteAction should paste and select cells if clipboard is not empty', () => {
    const pastedCells = [new Cell()];
    graph.isClipboardEmpty.mockReturnValue(false);
    graph.paste.mockReturnValue(pastedCells);
    const result = actions.pasteAction(graph);
    expect(graph.isClipboardEmpty).toHaveBeenCalled();
    expect(graph.paste).toHaveBeenCalledWith({ offset: 32 });
    expect(graph.cleanSelection).toHaveBeenCalled();
    expect(graph.select).toHaveBeenCalledWith(pastedCells);
    expect(result).toBe(true);
  });

  it('pasteAction should return false if clipboard is empty', () => {
    graph.isClipboardEmpty.mockReturnValue(true);
    const result = actions.pasteAction(graph);
    expect(graph.isClipboardEmpty).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('deleteAction should remove selected cells if any exist', () => {
    const selectedCells = [new Cell()];
    graph.getSelectedCells.mockReturnValue(selectedCells);
    
    const result = actions.deleteAction(graph);
    expect(graph.getSelectedCells).toHaveBeenCalled();
    expect(graph.removeCells).toHaveBeenCalledWith(selectedCells);
    expect(result).toBe(true);
  });

  it('deleteAction should return false if no cells are selected', () => {
    graph.getSelectedCells.mockReturnValue([]);
    const result = actions.deleteAction(graph);
    expect(graph.getSelectedCells).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
