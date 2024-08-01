import { AppDispatch } from '../../store';
import { Graph } from '@antv/x6';
import { TextAreaProps } from 'semantic-ui-react'
import { setActorModalOpen, setActorName, setActorDescription } from '../../store/modelEditor';
import Actor from '../../shapes/actor';

export const handleSubmit = (
  graph: Graph,
  actorModalSelectedCell: string | null,
  actorName: string,
  actorDescription: string,
  dispatch: AppDispatch
) => {
  if (actorModalSelectedCell) {
    const cell = graph.getCellById(actorModalSelectedCell);
    if (cell.isNode()) {
      const attrs = Actor.setActorAttrs(actorName);
      cell.setAttrs(attrs);
      cell.setData({ description: actorDescription });
    }
    dispatch(setActorModalOpen(false));
  }
};

export const handleClose = (dispatch: AppDispatch) => {
  dispatch(setActorModalOpen(false));
};

export const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) => {
  dispatch(setActorName(event.target.value));
};

export const handleDescriptionChange = (
  _e: React.ChangeEvent<HTMLTextAreaElement>,
  data: TextAreaProps,
  dispatch: AppDispatch
) => {
  dispatch(setActorDescription(data.value as string));
};
