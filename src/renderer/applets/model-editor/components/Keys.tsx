/** TODOS
 * cmd+a -> select all
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Graph, Rectangle } from '@antv/x6';

import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store';

import Actions from '../actions';
import {
  setExportModalOpen,
  setImportModalOpen,
  setExportPressed,
  setImportPressed,
  setFitViewPressed,
  setZoomInPressed,
  setZoomOutPressed,
  setUndoPressed,
  setRedoPressed,
  setCutPressed,
  setCopyPressed,
  setPastePressed,
  setDeletePressed,
  setSavePressed,
  setSelectAllPressed,
} from '../../../store/ModelEditorStore';

import { addLatestVersion } from '../../../store/VersionsStore';
import { showToast } from '../../../store/SettingsStore';
import { compareHashes } from '../../../utils';

interface KeysProps {
  graph: Graph;
}

const Keys: React.FC<KeysProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { modelId } = useParams();

  const { latestVersion } = useSelector((state: RootState) => state.versions);

  const { actorModalOpen, systemModalOpen, zoneModalOpen, dataflowModalOpen } =
    useSelector((state: RootState) => state.modelEditor);

  // suppress default key shortcuts...
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if Cmd (metaKey on Mac) is pressed along with "+" (equal sign key with shift)
      if (event.metaKey && event.key === '+') {
        event.preventDefault(); // Prevent the default action (zoom in this case)
      }

      // Check if Cmd (metaKey on Mac) is pressed along with "-" (equal sign key with shift)
      if (event.metaKey && event.key === '-') {
        event.preventDefault(); // Prevent the default action (zoom in this case)
      }

      // Check if Cmd (metaKey on Mac) is pressed along with "s" (equal sign key with shift)
      if (event.metaKey && event.key === 's') {
        event.preventDefault(); // Prevent the default action (zoom in this case)
      }

      // Check if Cmd (metaKey on Mac) is pressed along with "s" (equal sign key with shift)
      if (event.metaKey && event.key === 'a') {
        // do not prevent default behavior of ctrl/meta + a when any modal is open
        const except =
          actorModalOpen ||
          systemModalOpen ||
          zoneModalOpen ||
          dataflowModalOpen;

        if (!except) {
          event.preventDefault(); // Prevent the default action (zoom in this case)
        }
      }

      // Check if Cmd + Space is pressed
      if (event.metaKey && event.key === ' ') {
        event.preventDefault(); // Prevent the default action (Spotlight search on Mac)
      }
    };

    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [actorModalOpen, systemModalOpen, zoneModalOpen, dataflowModalOpen]);

  // Update ref whenever `isTextMode` changes
  // useEffect(() => {
  //   // isTextModeRef.current = isTextMode;
  //   Tools.toggleTextMode(graph.getCells(), isTextMode)
  // }, [isTextMode]);

  // Function to register all keybindings
  const registerKeyBindings = () => {
    const handleSaveSubmit = async () => {
      if (modelId && graph && latestVersion) {
        const oldGraph = latestVersion.payload.cells;
        const newGraph = graph.toJSON().cells;

        if (compareHashes(oldGraph, newGraph) === true) {
          // if hashes match, we do not save.
          return false;
        }

        const { x, y, height, width }: Rectangle = graph.getGraphArea();
        const promise = dispatch(
          addLatestVersion({ graph, modelId, x, y, height, width }),
        );

        dispatch(
          showToast({
            promise,
            loadingMessage: 'Saving threat model...',
            successMessage: 'Threat model saved',
            errorMessage: 'Failed to save threat model',
          }),
        );
        return true;
      }
      return false;
    };

    // save -> ctrl/meta + s
    const registerSaveKeys = async () => {
      graph.bindKey(['meta+s', 'ctrl+s'], async () => {
        if (await handleSaveSubmit()) {
          dispatch(setSavePressed(true));
        }
      });
    };

    // export -> ctrl/meta + e
    const registerExportKeys = async () => {
      graph.bindKey(['meta+e', 'ctrl+e'], async () => {
        dispatch(setExportModalOpen(true));
        dispatch(setExportPressed(true));
      });
    };

    // import -> ctrl/meta + i
    const registerImportKeys = async () => {
      graph.bindKey(['meta+i', 'ctrl+i'], async () => {
        dispatch(setImportModalOpen(true));
        dispatch(setImportPressed(true));
      });
    };

    // fit view -> ctrl/meta + whitespace
    const registerFitViewKeys = () => {
      graph.bindKey(['meta+space', 'ctrl+space'], () => {
        if (Actions.fitViewAction(graph)) {
          dispatch(setFitViewPressed(true));
        }
      });
    };

    // zoom in -> ctrl/meta + "-"
    const registerZoomInKeys = () => {
      graph.bindKey(['meta+=', 'ctrl+='], () => {
        if (Actions.zoomInAction(graph)) {
          dispatch(setZoomInPressed(true));
        }
      });
    };

    // zoom out -> ctrl/meta + "+"
    const registerZoomOutKeys = () => {
      graph.bindKey(['meta+-', 'ctrl+-'], () => {
        if (Actions.zoomOutAction(graph)) {
          dispatch(setZoomOutPressed(true));
        }
      });
    };

    // undo -> ctrl/meta + z
    const registerUndoKeys = () => {
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (Actions.undoAction(graph)) {
          dispatch(setUndoPressed(true));
        }
      });
    };

    // redo -> ctrl/meta + shift + z
    const registerRedoKeys = () => {
      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (Actions.redoAction(graph)) {
          dispatch(setRedoPressed(true));
        }
      });
    };

    // cut -> ctrl/meta + a
    const registerSelectAllKeys = () => {
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        if (Actions.selectAllAction(graph)) {
          dispatch(setSelectAllPressed(true));
        }
      });
    };

    // cut -> ctrl/meta + x
    const registerCutKeys = () => {
      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        if (Actions.cutAction(graph)) {
          dispatch(setCutPressed(true));
        }
      });
    };

    // copy -> ctrl/meta + c
    const registerCopyKeys = () => {
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        if (Actions.copyAction(graph)) {
          dispatch(setCopyPressed(true));
        }
      });
    };

    // paste -> ctrl/meta + v
    const registerPasteKeys = () => {
      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (Actions.pasteAction(graph)) {
          dispatch(setPastePressed(true));
        }
      });
    };

    // delete -> backspace
    const registerDeleteKeys = () => {
      graph.bindKey('backspace', () => {
        if (Actions.deleteAction(graph)) {
          dispatch(setDeletePressed(true));
        }
      });
    };

    registerSaveKeys();
    registerExportKeys();
    registerImportKeys();
    registerZoomInKeys();
    registerZoomOutKeys();
    registerFitViewKeys();
    registerSelectAllKeys();
    registerCutKeys();
    registerCopyKeys();
    registerPasteKeys();
    registerUndoKeys();
    registerRedoKeys();
    registerDeleteKeys();
  };

  useEffect(
    () => {
      registerKeyBindings();

      // Cleanup function to unbind all keybindings when the component unmounts
      return () => {
        // Here you would remove all the bindings to avoid memory leaks
        // This might depend on the API provided by @antv/x6 for unbinding
      };
    } /* [graph, dispatch, isTextMode] */,
  ); // Add dependencies as needed

  // Component doesn't render anything, so return null
  return null;
};

export default Keys;
