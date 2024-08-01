import { useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { Graph } from '@antv/x6';
import setup from '../../services/model-editor/setup';
import actor from '../../shapes/actor';
import dataflow from '../../shapes/dataflow';
import system from '../../shapes/system';
import zone from '../../shapes/zone';
import registry from '../../services/model-editor/registry';

const useInitializeGraph = (
  containerRef: MutableRefObject<HTMLDivElement | null>,
  minimapRef: MutableRefObject<HTMLDivElement | null>,
  isGraphInitialized: MutableRefObject<boolean>,
  setGraph: Dispatch<SetStateAction<Graph | undefined>>,
  gridVisible: 'none' | 'dot' | 'mesh'
) => {
  useEffect(() => {
    const initializeGraph = async () => {
      if (!containerRef.current || !minimapRef.current || isGraphInitialized.current) return;

      const graphInstance = setup.create(containerRef.current, gridVisible);

      actor.register();
      dataflow.register();
      system.register();
      zone.register();
      registry.register();

      setGraph(graphInstance);
      isGraphInitialized.current = true;
      containerRef.current.focus();
    };

    initializeGraph();
  }, [containerRef, minimapRef, isGraphInitialized, setGraph, gridVisible]);
};

export default useInitializeGraph;
