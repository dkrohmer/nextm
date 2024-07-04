import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Graph, Rectangle } from '@antv/x6';
import { Breadcrumb, Dimmer, Label, Loader, Message } from 'semantic-ui-react';
import toast, { Toaster } from 'react-hot-toast';

import system from './shapes/system';
import dataflow from './shapes/dataflow';
import actor from './shapes/actor';
import zone from './shapes/zone';

import StencilContainer from './components/Stencil';
import Keys from './components/Keys';
import Events from './components/Events';
import Toolbar from './components/Toolbar';

import ActorModal from './components/ActorModal';
import SystemModal from './components/SystemModal';
import DataflowModal from './components/DataflowModal';
import ZoneModal from './components/ZoneModal';

import setup from './setup';
import tools from './tools';

import { RootState, AppDispatch } from '../../store';

import { fetchProduct } from '../../store/ProductsStore';
import { fetchIncrement } from '../../store/IncrementsStore';
import { fetchModel } from '../../store/ModelsStore';
import { addLatestVersion, fetchLatestVersion,  } from '../../store/VersionsStore';
import { showToast, hideToast } from '../../store/SettingsStore';

import './ModelEditor.css';
import ExportModal from './components/ExportModal';
import ImportModal from './components/ImportModal';

import { compareHashes } from '../../utils';
import { ipcRenderer } from 'electron';
import { setSystemModalOpen } from '../../store/ModelEditorStore';

const ModelEditor: React.FC = () => {
  const { productId, incrementId, modelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const containerRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);
  const isGraphInitialized = useRef(false);

  // global redux states
  const { product, productIsLoading, productError } = useSelector((state: RootState) => state.products);
  const { increment, incrementIsLoading, incrementError } = useSelector((state: RootState) => state.increments);
  const { model, modelIsLoading, modelError } = useSelector((state: RootState) => state.models);
  const { latestVersion, latestVersionIsLoading, latestVersionIsLoaded, latestVersionError } = useSelector((state: RootState) => state.versions);
  const { gridVisible } = useSelector((state: RootState) => state.settings);
  const state = useSelector((state: RootState) => state);


  // local states
  const [graph, setGraph] = useState<Graph>();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  // global redux states
  const {
    actorModalOpen,
    systemModalOpen,
    zoneModalOpen,
    dataflowModalOpen
  } = useSelector((state: RootState) => state.modelEditor)

  const {
    sidebarVisible
  } = useSelector((state: RootState) => state.settings)

  // fetching objects
  useEffect(() => {
    if (productId && incrementId && modelId) {
      dispatch(fetchProduct({ productId, isEagerLoading: false }));
      dispatch(fetchIncrement({ incrementId, isEagerLoading: false }));
      dispatch(fetchModel({ modelId, isEagerLoading: false }));
      dispatch(fetchLatestVersion({ modelId }));
    }
  }, [dispatch, productId, incrementId, modelId, latestVersion!.id]);

  // load latest graph
  useEffect(() => {
    if (graph && latestVersion && latestVersion.payload && latestVersion.payload.cells) {
      const cells: Cell[] = latestVersion.payload.cells;
      graph.fromJSON(cells);

      if (isFirstLoad) {
        const { x, y, height, width } = latestVersion

        if (x && y && height && width) {
          graph.zoomToRect({x, y, height, width})
        } else {
          graph.zoomToFit({padding: {left: 200, right: 200}})
        }
        setIsFirstLoad(false)
      }
    }
  }, [dispatch, latestVersion]);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const modalsOpen = actorModalOpen || systemModalOpen || dataflowModalOpen || zoneModalOpen

      if (!modalsOpen) {
        containerRef.current.focus()
      }
    }
}, [
  actorModalOpen,
  systemModalOpen,
  zoneModalOpen,
  dataflowModalOpen
])

  // graph initialization
  useEffect(() => {
    async function initializeGraph() {
      if (!containerRef.current) return;
      if (!minimapRef.current) return;
      if (isGraphInitialized.current) return;

      // Setup graph instance
      const graphInstance = setup.create(containerRef.current, gridVisible);

      // Register custom shapes and tools before setting the graph
      actor.register();
      dataflow.register();
      system.register();
      zone.register();
      tools.register();
      
      setGraph(graphInstance);
      isGraphInitialized.current = true; // Mark the graph as initialized
      containerRef.current.focus();
    }
    initializeGraph();
  }, []);

  useEffect(() => {
    if (!sidebarVisible && containerRef && containerRef.current) {
      containerRef.current.focus()
    }
  }, [sidebarVisible]) 

  useEffect(() => {
    updateGrid();
  }, [gridVisible]);

  // Function to update the grid
  const updateGrid = () => {
    if (graph) {
      graph.hideGrid();
      if (gridVisible !== 'none') {
        graph.showGrid();
        graph.drawGrid({ type: gridVisible });
      }
    }
  };

  // Function to save the current model
  const saveModel = async () => {
    if (modelId && graph && latestVersion) {
      const oldGraph = latestVersion.payload.cells;
      const newGraph = graph.toJSON().cells;

      if (compareHashes(oldGraph, newGraph) === true) {
        // if hashes match, we do not save.
        return;
      }
      const {x, y, height, width}: Rectangle = graph.getGraphArea()
      const promise = dispatch(addLatestVersion({ modelId, graph, x, y, height, width })).unwrap()
      dispatch(
        showToast({
          promise: promise, // Resolve immediately since there's no async operation
          loadingMessage: 'Saving threat model...', // No loading message needed
          successMessage: `Threat model saved`, // Success message with grid type
          errorMessage: 'Failed to save threat model', // No error message needed
        })
      );

    } else {
      return;
    }
  };

  const handleNavigate = async (path: string) => {
    await saveModel();
    navigate(path);
  };

  const handleModalClose = () => {
    console.log('')
  };

  return (
    <div id="x6-graph-container" className="graph-container">
      <div className="x6-graph-wrap">
        <Breadcrumb style={{ position: 'absolute', left: 200, top: 130, zIndex: 2 }}>
          <Breadcrumb.Section link onClick={() => handleNavigate(`/products`)}>
            Products
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link onClick={() => handleNavigate(`/products/${product!.id}`)}>
            {product?.name}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link onClick={() => handleNavigate(`/products/${product!.id}/increments/${increment!.id}`)}>
            {increment?.name}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>{model?.name}</Breadcrumb.Section>
        </Breadcrumb>
       
        {/* Loader */}
        {(productIsLoading || incrementIsLoading || modelIsLoading || latestVersionIsLoading) && (
          <Dimmer active inverted={true}>
            <Loader>Loading Model...</Loader>
          </Dimmer>
        )}

        {/* Error handling */}
        {(productError || incrementError || modelError || latestVersionError) && (
          <Message negative style={{ textAlign: 'center' }}>
            <Message.Header>Error</Message.Header>
            <p>{modelError}</p>
          </Message>
        )}

        {/* Normal behavior */}
        {product && increment && model && latestVersion && graph && (
          <div>
            <Keys graph={graph} />
            <Events graph={graph} />
            <StencilContainer graph={graph} />
            <Toolbar graph={graph} />

            {/* Modals */}
            <ExportModal graph={graph} filename={`${product.name}_${increment.name}_${model.name}`} />
            <ImportModal graph={graph} />
            <ActorModal graph={graph} />
            <SystemModal graph={graph} onClose={handleModalClose}/>
            <ZoneModal graph={graph} />
            <DataflowModal graph={graph} />
          </div>
        )}

        <div ref={containerRef} className="x6-graph" id="graph-container" />

        <div ref={minimapRef} />
      </div>
    </div>
  );
};

export default ModelEditor;
