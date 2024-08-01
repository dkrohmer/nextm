import { Graph, Rectangle } from '@antv/x6';
import { addLatestVersion } from '../../services/api/versions';
import { showToast } from '../../store/settings';
import { compareGraphHashes } from './compareGraphHashes';
import { AppDispatch } from '../../store';

export async function saveModel (
  modelId: string | undefined,
  graph: Graph | undefined,
  latestVersion: any,
  dispatch: AppDispatch
) {
  if (modelId && graph && latestVersion) {
    const oldGraph = latestVersion.payload.cells;
    const newGraph = graph.toJSON().cells;

    if (compareGraphHashes(oldGraph, newGraph)) return;

    const { x, y, height, width }: Rectangle = graph.getGraphArea();
    const promise = dispatch(
      addLatestVersion({ modelId, graph, x, y, height, width })
    ).unwrap();

    dispatch(
      showToast({
        promise,
        loadingMessage: 'Saving threat model...',
        successMessage: `Threat model saved`,
        errorMessage: 'Failed to save threat model',
      })
    );
  }
}

