import React from 'react';
import { Radio } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setGridVisible, showToast } from '../../store/settings';

const GridTypeDot: React.FC = () => {
  /**
   * global states
   */
  const { gridVisible } = useSelector((state: RootState) => state.settings);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleGridChange = (e: React.FormEvent<HTMLInputElement>, { value }: any) => {
    window.electron.setGridType(value);
    dispatch(setGridVisible(value));
    dispatch(
      showToast({
        promise: Promise.resolve(),
        loadingMessage: '',
        successMessage: `Grid type changed to: ${value}`,
        errorMessage: '',
      })
    );
  };
  
  /**
   * tsx
   */
  return (
    <Radio
      data-testid="grid-type-dot-radio"
      label="Dot"
      name="gridVisible"
      value="dot"
      checked={gridVisible === 'dot'}
      onChange={handleGridChange}
    />
  );
};

export default GridTypeDot;
