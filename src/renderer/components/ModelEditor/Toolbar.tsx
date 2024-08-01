import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { RootState } from '../../store';
import useToolbarStateReset from '../../hooks/model-editor/useToolbarStateReset';
import useGraphHistoryChange from '../../hooks/model-editor/useGraphHistoryChange';
import ToolbarSave from './ToolbarSave';
import ToolbarExport from './ToolbarExport';
import ToolbarImport from './ToolbarImport';
import ToolbarFitView from './ToolbarFitView';
import ToolbarZoomIn from './ToolbarZoomIn';
import ToolbarZoomOut from './ToolbarZoomOut';
import ToolbarUndo from './ToolbarUndo';
import ToolbarRedo from './ToolbarRedo';
import ToolbarSelectAll from './ToolbarSelectAll';
import ToolbarCut from './ToolbarCut';
import ToolbarCopy from './ToolbarCopy';
import ToolbarPaste from './ToolbarPaste';
import ToolbarDelete from './ToolbarDelete';
import ToolbarSaveAndClose from './ToolbarSaveAndClose';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import '@antv/x6-react-components/es/color-picker/style/index.css';
import 'antd/dist/reset.css';
import '../../styles/model-editor/toolbar.css';

interface CustomToolbarProps {
  graph: Graph;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ graph }) => {
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

  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [canUndo, setCanUndo] = useState<boolean>(false);

  useToolbarStateReset({
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
  });

  useGraphHistoryChange(graph, setCanRedo, setCanUndo);

  return (
    <div id="toolbar" className="toolbar">
      <Toolbar hoverEffect size="big">
        {/* Save group */}
        <Toolbar.Group>
          <ToolbarSave graph={graph} modelId={modelId} latestVersion={latestVersion} />
          <ToolbarExport />
          <ToolbarImport />
        </Toolbar.Group>

        {/* Zoom group */}
        <Toolbar.Group>
          <ToolbarFitView graph={graph} />
          <ToolbarZoomIn graph={graph} />
          <ToolbarZoomOut graph={graph} />
        </Toolbar.Group>

        {/* History group */}
        <Toolbar.Group>
          <ToolbarUndo graph={graph} canUndo={canUndo} />
          <ToolbarRedo graph={graph} canRedo={canRedo} />
        </Toolbar.Group>

        {/* Interaction group */}
        <Toolbar.Group>
          <ToolbarSelectAll graph={graph} />
          <ToolbarCut graph={graph} />
          <ToolbarCopy graph={graph} />
          <ToolbarPaste graph={graph} />
          <ToolbarDelete graph={graph} />
        </Toolbar.Group>

        {/* Save and close */}
        <ToolbarSaveAndClose
          graph={graph}
          modelId={modelId}
          latestVersion={latestVersion}
          navigate={navigate}
          productId={productId}
          incrementId={incrementId}
        />
      </Toolbar>
    </div>
  );
};

export default CustomToolbar;
