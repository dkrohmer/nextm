import React from 'react';
import { useSelector } from 'react-redux';
import { Graph } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { RootState } from '../../store';
import useToolbarStateReset from '../../hooks/model-editor/useToolbarStateReset';
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
  /**
   * global states
   */
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

  /**
   * hooks
   */
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

  /**
   * tsx
   */
  return (
    <div id="toolbar" className="toolbar" data-testid="toolbar">
      <Toolbar hoverEffect size="big">
        {/* Save group */}
        <Toolbar.Group data-testid="toolbar-group-save">
          <ToolbarSave graph={graph} data-testid="toolbar-save" />
          <ToolbarExport data-testid="toolbar-export" />
          <ToolbarImport data-testid="toolbar-import" />
        </Toolbar.Group>

        {/* Zoom group */}
        <Toolbar.Group data-testid="toolbar-group-zoom">
          <ToolbarFitView graph={graph} data-testid="toolbar-fitview" />
          <ToolbarZoomIn graph={graph} data-testid="toolbar-zoomin" />
          <ToolbarZoomOut graph={graph} data-testid="toolbar-zoomout" />
        </Toolbar.Group>

        {/* History group */}
        <Toolbar.Group data-testid="toolbar-group-history">
          <ToolbarUndo graph={graph} data-testid="toolbar-undo" />
          <ToolbarRedo graph={graph} data-testid="toolbar-redo" />
        </Toolbar.Group>

        {/* Interaction group */}
        <Toolbar.Group data-testid="toolbar-group-interaction">
          <ToolbarSelectAll graph={graph} data-testid="toolbar-selectall" />
          <ToolbarCut graph={graph} data-testid="toolbar-cut" />
          <ToolbarCopy graph={graph} data-testid="toolbar-copy" />
          <ToolbarPaste graph={graph} data-testid="toolbar-paste" />
          <ToolbarDelete graph={graph} data-testid="toolbar-delete" />
        </Toolbar.Group>

        {/* Save and close */}
        <ToolbarSaveAndClose graph={graph} data-testid="toolbar-saveandclose" />
      </Toolbar>
    </div>
  );
};

export default CustomToolbar;
