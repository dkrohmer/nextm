import { Graph } from '@antv/x6';
import { TextAreaProps } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { setZoneModalOpen, setZoneName, setZoneTrustLevel, setZoneDescription } from '../../store/modelEditor';
import Zone from '../../shapes/zone';

export const handleSubmit = (
  graph: Graph,
  zoneModalSelectedCell: string | null,
  zoneName: string,
  zoneTrustLevel: string,
  zoneDescription: string,
  dispatch: AppDispatch
) => {
  if (zoneModalSelectedCell) {
    const cell = graph.getCellById(zoneModalSelectedCell);
    if (cell.isNode()) {
      const attrs = Zone.setZoneAttrs(zoneName, zoneTrustLevel);
      cell.setAttrs(attrs);
      cell.setData({ description: zoneDescription });
    }
    dispatch(setZoneModalOpen(false));
  }
};

export const handleClose = (dispatch: AppDispatch) => {
  dispatch(setZoneModalOpen(false));
};

export const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) => {
  dispatch(setZoneName(event.target.value));
};

export const handleTrustLevelChange = (value: string, dispatch: AppDispatch) => {
  dispatch(setZoneTrustLevel(value));
};

export const handleDescriptionChange = (
  _e: React.ChangeEvent<HTMLTextAreaElement>,
  data: TextAreaProps,
  dispatch: AppDispatch
) => {
  dispatch(setZoneDescription(data.value as string));
};
