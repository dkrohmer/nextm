import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { RootState } from '../../store';

const useLoadLatestGraph = (graph: Graph | undefined) => {
  const { latestVersion } = useSelector((state: RootState) => state.versions);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (
      graph &&
      latestVersion &&
      latestVersion.payload &&
      latestVersion.payload.cells
    ) {
      const { cells } = latestVersion.payload;
      graph.fromJSON(cells);

      if (isFirstLoad) {
        const { x, y, height, width } = latestVersion;

        if (x && y && height && width) {
          graph.zoomToRect({ x, y, height, width });
        } else {
          graph.zoomToFit({ padding: { left: 200, right: 200 } });
        }
        setIsFirstLoad(false);
      }
    }
  }, [graph, latestVersion]);
};

export default useLoadLatestGraph;
