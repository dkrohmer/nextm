import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Graph as x6Graph } from '@antv/x6';
import { RootState } from '../../store';
import useFetchVersion from '../../hooks/useFetchVersion';
import useLoadLatestGraph from '../../hooks/model-editor/useLoadLatestGraph';
import useFocusContainer from '../../hooks/model-editor/useFocusContainer';
import useFocusOnSidebarChange from '../../hooks/useFocusOnSidebarChange';
import useUpdateGrid from '../../hooks/useUpdateGrid';
import useNodeAdded from '../../hooks/model-editor/useNodeAdded';
import useEdgeEvents from '../../hooks/model-editor/useEdgeEvents';
import useNodeEvents from '../../hooks/model-editor/useNodeEvents';
import useNodeEmbed from '../../hooks/model-editor/useNodeEmbed';
import useKeys from '../../hooks/model-editor/useKeys';
import useKeysPreventDefault from '../../hooks/model-editor/useKeysPreventDefault';
import useInitializeGraph from '../../hooks/model-editor/useInitializeGraph';
import useHoverCells from '../../hooks/model-editor/useHoverCells';
import useGraphHistoryChange from '../../hooks/model-editor/useGraphHistoryChange';
import Breadcrumbs from './Breadcrumbs';
import Loader from './Loader';
import Error from './Error';
import Graph from './Graph';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/model-editor/model-editor.css'

const ModelEditor: React.FC = () => {
  /**
   * local states
   */
  const [graph, setGraph] = useState<x6Graph | undefined>(undefined);

  /**
   * global states
   */
  const { product, productIsLoading, productError } = useSelector((state: RootState) => state.products);
  const { increment, incrementIsLoading, incrementError } = useSelector((state: RootState) => state.increments);
  const { model, modelIsLoading, modelError } = useSelector((state: RootState) => state.models);
  const { latestVersion, latestVersionIsLoading, latestVersionError } = useSelector((state: RootState) => state.versions);
  const { gridVisible } = useSelector((state: RootState) => state.settings);

  /**
   * hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);
  const isGraphInitialized = useRef(false);
  useFetchVersion();
  useLoadLatestGraph(graph);
  useFocusContainer(containerRef);
  useFocusOnSidebarChange(containerRef);
  useUpdateGrid(graph, gridVisible);
  useKeys(graph);
  useKeysPreventDefault();
  useNodeAdded(graph);
  useEdgeEvents(graph);
  useNodeEvents(graph);
  useNodeEmbed(graph);
  useHoverCells(graph);
  useInitializeGraph(containerRef, minimapRef, isGraphInitialized, setGraph, gridVisible);
  useGraphHistoryChange(graph);

  /**
   * tsx
   */
  return (
    <div id="x6-graph-container" className="graph-container">
      <div className="x6-graph-wrap">
        <Breadcrumbs graph={graph ?? null}/>
        <Loader isLoading={productIsLoading || incrementIsLoading || modelIsLoading || latestVersionIsLoading} />
        <Error errors={[productError, incrementError, modelError, latestVersionError]} />
        {product && increment && model && latestVersion && graph && (
          <Graph graph={graph} />
        )}
        <div ref={containerRef} className="x6-graph" id="graph-container" />
        <div ref={minimapRef} />
      </div>
    </div>
  );
};

export default ModelEditor;
