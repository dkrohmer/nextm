import React, { useState, useEffect, useRef } from 'react';
import { Cell, Edge, Graph, Node } from '@antv/x6';
import { useDispatch, useSelector } from 'react-redux';

import {   
  setTextModeSelectedCell,
  setTextModeInputValue,

  setSelectedNodeId,
  setSelectedEdgeId,

  setDataflowLabel,
  setDataflowProtocol,
  setDataflowStride,
  setDataflowModalSelectedCell,
  setDataflowModalOpen,

  setActorModalOpen,
  setActorModalSelectedCell,
  setActorName,
  setActorDescription,

  setSystemModalOpen,
  setSystemModalSelectedCell,
  setSystemName,
  setSystemStack,
  setSystemDescription,

  setZoneModalSelectedCell,
  setZoneModalOpen,
  setZoneName,
  setZoneTrustLevel,
  setZoneDescription,
} from '../../../store/ModelEditorStore';

import type { DataflowStride } from '../../../store/ModelEditorStore';

import Dataflow from '../shapes/dataflow';
import { AppDispatch, RootState } from '../../../store';

interface EventsProps {
  graph: Graph;
}

const GraphEvents: React.FC<EventsProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedNodeId,
    selectedEdgeId,
  } = useSelector((state: RootState) => state.modelEditor);

  const {
    explicitObjectSelection
  } = useSelector((state: RootState) => state.settings);

  // Set to track processed nodes
  const processedNodes = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Function to handle what happens when a new node is added
    const nodeAdded = (node: Node) => {
      console.log("Dataflow added...");
      
      // Convert dataflow to edge when added to canvas
      if (node.shape === 'dataflow-stencil') {
        // Check for duplicate node IDs
        if (processedNodes.current.has(node.id)) {
          node.remove();
          return;
        }

        Dataflow.createEdge(graph, node);
        node.remove();

        // Add node ID to the processed set
        processedNodes.current.add(node.id);
      }
    };

    graph.on('node:added', ({ node }) => nodeAdded(node));

    return () => {
      graph.off('node:added', nodeAdded);
    };
  }, []);

  useEffect(() => {
    // edge events
    const edgeSelected = ({ cell }: { cell: Cell }) => {
      if (cell.isEdge()) {
        dispatch(setSelectedEdgeId(cell.id));
        cell.addTools([
          'edge-vertices',
          'edge-source-handle',
          'edge-target-handle',
        ]);
      }
    };

    const edgeUnselected = ({ cell }: { cell: Cell }) => {
      if (cell.isEdge() && selectedEdgeId && cell.id === selectedEdgeId) {
        dispatch(setSelectedEdgeId(null));
      }
      cell.removeTools();
    };

    const mapStringToDataflowStride = (input: string): DataflowStride => {
      // Strip all non-STRIDE characters from the input string
      const sanitizedInput = input.replace(/[^STRIDEstride]/g, '');
    
      // Create a default DataflowStride object with all values set to false
      const result: DataflowStride = {
        spoofing: false,
        tampering: false,
        repudiation: false,
        informationDisclosure: false,
        denialOfService: false,
        elevatePrivilege: false,
      };
    
      // Map characters to their corresponding boolean values
      for (const char of sanitizedInput) {
        switch (char.toUpperCase()) {
          case 'S':
            result.spoofing = true;
            break;
          case 'T':
            result.tampering = true;
            break;
          case 'R':
            result.repudiation = true;
            break;
          case 'I':
            result.informationDisclosure = true;
            break;
          case 'D':
            result.denialOfService = true;
            break;
          case 'E':
            result.elevatePrivilege = true;
            break;
          default:
            // This case should never be reached due to the sanitization step
            break;
        }
      }
    
      return result;
    };

    const edgeContextmenu = ({ cell, e }: { cell: Cell, e: MouseEvent }) => {
      if (graph.getSelectedCells().length <= 1 && cell.isEdge()) {
        if (!explicitObjectSelection || (selectedEdgeId && cell.id === selectedEdgeId)) {
          e.stopPropagation();
          e.preventDefault();
          // Perform your action here for the selected edge and context menu click
          const label = cell.getLabelAt(0)!.attrs!.label!.text! as string;
          const protocol = cell.getLabelAt(0)!.attrs!.protocol!.text! as string;
          const stride = mapStringToDataflowStride(cell.getLabelAt(0)!.attrs!.stride!.text! as string);
          // const description = cell.getData().description!
          dispatch(setDataflowLabel(label));
          dispatch(setDataflowProtocol(protocol));
          dispatch(setDataflowStride(stride));
          dispatch(setDataflowModalSelectedCell(cell.id));
          dispatch(setDataflowModalOpen(true));
        }
      }
    };

    // node events
    const nodeSelected = ({ cell }: { cell: Cell }) => {
      if (cell.isNode()) {
        dispatch(setSelectedEdgeId(null));
        dispatch(setSelectedNodeId(cell.id));
      }
    };

    const nodeUnselected = ({ cell }: { cell: Cell }) => {
      if (cell.isNode() && selectedNodeId && cell.id === selectedNodeId) {
        dispatch(setSelectedNodeId(null));
        dispatch(setSelectedEdgeId(null));
      }
    };

    const nodeContextmenu = ({ cell, e }: { cell: Cell, e: MouseEvent }) => {
      if (graph.getSelectedCells().length <= 1 && cell.isNode()) {
        if (!explicitObjectSelection || (selectedNodeId && cell.id === selectedNodeId)) {
          e.stopPropagation();
          e.preventDefault();
          const inputValue = cell.getAttrs()!.text!.text! as string;
          dispatch(setTextModeInputValue(inputValue));
          dispatch(setTextModeSelectedCell(cell.id));
  
          if (cell.shape === 'actor') {
            const name = cell.getAttrs()!.name!.text! as string;
            const description = cell.getData()!.description! as string;
  
            dispatch(setActorName(name));
            dispatch(setActorDescription(description));
            dispatch(setActorModalSelectedCell(cell.id));
            dispatch(setActorModalOpen(true));
  
          } else if (cell.shape === 'system') {
            const name = cell.getAttrs()!.name!.text! as string;
            const stack = cell.getAttrs()!.stack!.text! as string;
            const description = cell.getData()!.description! as string;
            dispatch(setSystemName(name));
            dispatch(setSystemStack(stack));
            dispatch(setSystemDescription(description));
            dispatch(setSystemModalSelectedCell(cell.id));
            dispatch(setSystemModalOpen(true));
  
          } else if (cell.shape === 'zone') {
            const name = cell.getAttrs()!.name!.text! as string;
            const trustLevel = cell.getAttrs()!.trustLevel!.text! as string;
            const description = cell.getData()!.description! as string;
  
            dispatch(setZoneName(name));
            dispatch(setZoneTrustLevel(trustLevel));
            dispatch(setZoneDescription(description));
            dispatch(setZoneModalSelectedCell(cell.id));
            dispatch(setZoneModalOpen(true));
          }
        }
      }
    };

    const updateZIndex = (cell: Cell, parentZIndex: number) => {
      const newZIndex = parentZIndex + 1;
      cell.setZIndex(newZIndex);
    
      // Recursively update zIndex of all children
      const children = cell.getChildren();
      if (children) {
        children.forEach(child => {
          updateZIndex(child, newZIndex);
        });
      }
    };
    
    const nodeEmbed = ({ cell }: { cell: Cell }) => {
      if (cell.hasParent()) {
        const parent = cell.getParent();
        if (parent) {
          const parentZIndex = parent.getZIndex() || 0;
          updateZIndex(cell, parentZIndex);
        }
      }
    };

    // Registering event listeners
    graph.on('edge:selected', edgeSelected);
    graph.on('edge:unselected', edgeUnselected);
    graph.on('edge:contextmenu', edgeContextmenu);
    graph.on('node:selected', nodeSelected);
    graph.on('node:unselected', nodeUnselected);
    graph.on('node:contextmenu', nodeContextmenu);
    graph.on('node:change:parent', nodeEmbed);

    return () => {
      graph.off('edge:selected', edgeSelected);
      graph.off('edge:unselected', edgeUnselected);
      graph.off('edge:contextmenu', edgeContextmenu);
      graph.off('node:selected', nodeSelected);
      graph.off('node:unselected', nodeUnselected);
      graph.off('node:contextmenu', nodeContextmenu);
      graph.off('node:change:parent', nodeEmbed);
    };
  }, [selectedNodeId, selectedEdgeId, explicitObjectSelection]);

  // This component doesn't render anything itself
  return null;
};

export default GraphEvents;
