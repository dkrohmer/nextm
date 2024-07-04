import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Graph, Rectangle } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import {
  SaveOutlined,
  ExportOutlined,
  ImportOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
  CompressOutlined,
  ScissorOutlined,
  CopyOutlined,
  SnippetsOutlined,
  CloseOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import { RootState, AppDispatch } from '../../../store';
import actions from '../actions';
import {
  setSavePressed,
  setExportPressed,
  setImportPressed,
  setFitViewPressed,
  setZoomInPressed,
  setZoomOutPressed,
  setUndoPressed,
  setRedoPressed,
  setSelectAllPressed,
  setCutPressed,
  setCopyPressed,
  setPastePressed,
  setDeletePressed,
  setExportModalOpen,
  setImportModalOpen,
} from '../../../store/ModelEditorStore';
import { showToast } from '../../../store/SettingsStore';
import { addLatestVersion } from '../../../store/VersionsStore';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import '@antv/x6-react-components/es/color-picker/style/index.css';
import 'antd/dist/reset.css';
import { compareHashes } from '../../../utils';

const Item = Toolbar.Item; // eslint-disable-line
const Group = Toolbar.Group; // eslint-disable-line

interface CustomToolbarProps {
  graph: Graph;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ graph }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { productId, incrementId, modelId } = useParams();

  const {
    isSavePressed,
    isExportPressed,
    isImportPressed,
    isFitViewPressed,
    isZoomInPressed,
    isZoomOutPressed,
    isUndoPressed,
    isRedoPressed,
    isSelectAllPressed,
    isCutPressed,
    isCopyPressed,
    isPastePressed,
    isDeletePressed,
  } = useSelector((state: RootState) => state.modelEditor);

  const { latestVersion } = useSelector((state: RootState) => state.versions);

  const [, setModelIdParam] = useState<string>();
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [canUndo, setCanUndo] = useState<boolean>(false);

  useEffect(() => {
    setModelIdParam(modelId);

    let timerId: number | undefined;
    if (isSavePressed) {
      timerId = window.setTimeout(() => {
        dispatch(setSavePressed(false));
      }, 100);
    }
    if (isExportPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setExportPressed(false));
      }, 100);
    }
    if (isImportPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setImportPressed(false));
      }, 100);
    }
    if (isFitViewPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setFitViewPressed(false));
      }, 100);
    }
    if (isZoomInPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setZoomInPressed(false));
      }, 100);
    }
    if (isZoomOutPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setZoomOutPressed(false));
      }, 100);
    }
    if (isUndoPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setUndoPressed(false));
      }, 100);
    }
    if (isRedoPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setRedoPressed(false));
      }, 100);
    }
    if (isSelectAllPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setSelectAllPressed(false));
      }, 100);
    }
    if (isCutPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setCutPressed(false));
      }, 100);
    }
    if (isCopyPressed) {
      timerId = window.setTimeout(() => {
        dispatch(setCopyPressed(false));
      }, 100);
    }
    if (isPastePressed) {
      timerId = window.setTimeout(() => {
        dispatch(setPastePressed(false));
      }, 100);
    }
    if (isDeletePressed) {
      timerId = window.setTimeout(() => {
        dispatch(setDeletePressed(false));
      }, 100);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [
    isSavePressed,
    isExportPressed,
    isImportPressed,
    isFitViewPressed,
    isZoomInPressed,
    isZoomOutPressed,
    isUndoPressed,
    isRedoPressed,
    isSelectAllPressed,
    isCutPressed,
    isCopyPressed,
    isPastePressed,
    isDeletePressed,
    modelId,
  ]);

  useEffect(() => {
    graph.on('history:change', () => {
      setCanRedo(graph.canRedo());
      setCanUndo(graph.canUndo());
    });
  }, [graph]);

  const handleSaveSubmit = async () => {
    if (modelId && latestVersion) {
      const oldGraph = latestVersion.payload.cells;
      const newGraph = graph.toJSON().cells;

      if (compareHashes(oldGraph, newGraph) === true) {
        return;
      }

      const { x, y, height, width }: Rectangle = graph.getGraphArea();
      const promise = dispatch(
        addLatestVersion({ modelId, graph, x, y, height, width }),
      );
      dispatch(
        showToast({
          promise,
          loadingMessage: 'Saving threat model...',
          successMessage: 'Threat model saved',
          errorMessage: 'Failed to save threat model',
        }),
      );
    }
  };

  const handleSaveAndCloseSubmit = async () => {
    await handleSaveSubmit();
    navigate(`/products/${productId}/increments/${incrementId}`);
  };

  return (
    <div id="toolbar" className="toolbar">
      <Toolbar hoverEffect size="big">
        {/* Save group */}
        <Group>
          <Item
            name="save"
            tooltip="Save model (cmd + s)"
            active={isSavePressed}
            icon={<SaveOutlined />}
            onClick={handleSaveSubmit}
          />
          <Item
            name="export"
            tooltip="Export model (cmd + e)"
            active={isExportPressed}
            icon={<ExportOutlined />}
            onClick={() => dispatch(setExportModalOpen(true))}
          />
          <Item
            name="import"
            tooltip="Import model (cmd + i)"
            active={isImportPressed}
            icon={<ImportOutlined />}
            onClick={() => dispatch(setImportModalOpen(true))}
          />
        </Group>

        {/* Zoom group */}
        <Group>
          <Item
            name="fitView"
            tooltip="Fit View (cmd + whitespace)"
            active={isFitViewPressed}
            onClick={() => actions.fitViewAction(graph)}
            icon={<CompressOutlined />}
          />
          <Item
            name="zoomIn"
            tooltip="Zoom In (cmd + plus)"
            onClick={() => actions.zoomInAction(graph)}
            active={isZoomInPressed}
            icon={<ZoomInOutlined />}
          />
          <Item
            name="zoomOut"
            tooltip="Zoom Out (cmd + minus)"
            onClick={() => actions.zoomOutAction(graph)}
            active={isZoomOutPressed}
            icon={<ZoomOutOutlined />}
          />
        </Group>

        {/* History group */}
        <Group>
          <Item
            name="undo"
            tooltip="Undo (cmd + z)"
            icon={<UndoOutlined />}
            disabled={!canUndo}
            active={isUndoPressed}
            onClick={() => actions.undoAction(graph)}
          />
          <Item
            name="redo"
            tooltip="Redo (cmd + shift + z)"
            icon={<RedoOutlined />}
            disabled={!canRedo}
            active={isRedoPressed}
            onClick={() => actions.redoAction(graph)}
          />
        </Group>

        {/* Interaction group */}
        <Group>
          <Item
            name="all"
            icon={<ExpandOutlined />}
            disabled={false}
            tooltip="Select all (ctrl/cmd + a)"
            active={isSelectAllPressed}
            onClick={() => actions.selectAllAction(graph)}
          />
          <Item
            name="cut"
            icon={<ScissorOutlined />}
            disabled={false}
            tooltip="Cut (ctrl/cmd + x)"
            active={isCutPressed}
            onClick={() => actions.cutAction(graph)}
          />
          <Item
            name="copy"
            icon={<CopyOutlined />}
            disabled={false}
            tooltip="Copy (ctrl/cmd + c)"
            active={isCopyPressed}
            onClick={() => actions.copyAction(graph)}
          />
          <Item
            name="paste"
            icon={<SnippetsOutlined />}
            disabled={false}
            tooltip="Paste (ctrl/cmd + v)"
            active={isPastePressed}
            onClick={() => actions.pasteAction(graph)}
          />
          <Item
            name="delete"
            icon={<DeleteOutlined />}
            disabled={false}
            tooltip="Delete (backspace)"
            active={isDeletePressed}
            onClick={() => actions.deleteAction(graph)}
          />
        </Group>

        {/* Save and close */}
        <Item
          className="save-and-close-button"
          name="saveandclose"
          icon={<CloseOutlined />}
          tooltip="Save and Close Threat Model Editor"
          onClick={handleSaveAndCloseSubmit}
        />
      </Toolbar>
    </div>
  );
};

export default CustomToolbar;
