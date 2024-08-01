import React from 'react';
import { Radio, RadioProps } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { handleGridChange } from '../../utils/settings/grid-type-handlers';

const GridTypeMesh: React.FC = () => {
  const { gridVisible } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Radio
      label="Mesh"
      name="gridVisible"
      value="mesh"
      checked={gridVisible === 'mesh'}
      onChange={(event: React.FormEvent<HTMLInputElement>, data: RadioProps) =>
        handleGridChange(event, data, dispatch)
      }
    />
  );
};

export default GridTypeMesh;
