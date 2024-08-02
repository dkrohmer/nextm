import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { RootState, AppDispatch } from '../../store';
import { saveModel } from '../../utils/model-editor/saveModel';
import { handleNavigate } from '../../utils/model-editor/navigationHandler';
import useFetchObjects from '../../hooks/model-editor/useFetchObjects';
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
import ModelEditorBreadcrumbs from './Breadcrumbs';
import ModelEditorLoader from './Loader';
import ModelEditorError from './Error';
import ModelEditorGraph from './Graph';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/model-editor/model-editor.css'

const ModelEditor: React.FC = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const containerRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);
  const isGraphInitialized = useRef(false);

  const { product, productIsLoading, productError } = useSelector((state: RootState) => state.products);
  const { increment, incrementIsLoading, incrementError } = useSelector((state: RootState) => state.increments);
  const { model, modelIsLoading, modelError } = useSelector((state: RootState) => state.models);
  const { latestVersion, latestVersionIsLoading, latestVersionError } = useSelector((state: RootState) => state.versions);
  const { gridVisible } = useSelector((state: RootState) => state.settings);

  const [graph, setGraph] = useState<Graph | undefined>(undefined);

  useFetchObjects(latestVersion);
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

  return (
    <div id="x6-graph-container" className="graph-container">
      <div className="x6-graph-wrap">
        <ModelEditorBreadcrumbs 
          product={product} 
          increment={increment} 
          model={model} 
          handleNavigate={async (path: string) => {
            if (graph) {
              handleNavigate(path, () => saveModel(modelId, graph, latestVersion, dispatch), navigate);
            }
          }} 
        />

        <ModelEditorLoader loading={productIsLoading || incrementIsLoading || modelIsLoading || latestVersionIsLoading} />
        <ModelEditorError errors={[productError, incrementError, modelError, latestVersionError]} />

        {product && increment && model && latestVersion && graph && (
          <ModelEditorGraph 
            graph={graph} 
            product={product} 
            increment={increment} 
            model={model} 
          />
        )}

        <div ref={containerRef} className="x6-graph" id="graph-container" />
        <div ref={minimapRef} />
      </div>
    </div>
  );
};

export default ModelEditor;
