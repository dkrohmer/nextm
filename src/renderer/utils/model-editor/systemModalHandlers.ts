import { TextAreaProps } from 'semantic-ui-react';
import { AppDispatch } from '../../store';
import { Graph } from '@antv/x6';
import { setSystemModalOpen, setSystemName, setSystemStack, setSystemDescription } from '../../store/modelEditor';
import System from '../../shapes/system';


export const handleSubmit = (
  graph: Graph,
  systemModalSelectedCell: string | null,
  systemName: string,
  systemStack: string,
  systemDescription: string,
  dispatch: AppDispatch
) => {
  if (systemModalSelectedCell) {
    const cell = graph.getCellById(systemModalSelectedCell);
    if (cell.isNode()) {
      const attrs = System.setSystemAttrs(systemName, systemStack);
      cell.setAttrs(attrs);
      cell.setData({ description: systemDescription });
    }
    dispatch(setSystemModalOpen(false));
  }
};

export const handleClose = (dispatch: AppDispatch) => {
  dispatch(setSystemModalOpen(false));
};

export const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) => {
  dispatch(setSystemName(event.target.value));
};

export const handleStackChange = (event: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) => {
  dispatch(setSystemStack(event.target.value));
};

export const handleDescriptionChange = (
  _e: React.ChangeEvent<HTMLTextAreaElement>,
  data: TextAreaProps,
  dispatch: AppDispatch
) => {
  dispatch(setSystemDescription(data.value as string));
};
