import React from 'react';
import { Radio } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setGridVisible, showToast } from '../../store/settings';

const GridTypeNone: React.FC = () => {
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
  const handleGridChange = (
    e: React.FormEvent<HTMLInputElement>,
    { value }: any,
  ) => {
    window.electron.setGridType(value);
    dispatch(setGridVisible(value));
    dispatch(
      showToast({
        promise: Promise.resolve(),
        loadingMessage: '',
        successMessage: `Grid type changed to: ${value}`,
        errorMessage: '',
      }),
    );
  };

  /**
   * tsx
   */
  return (
    <Radio
      data-testid="grid-type-none-radio"
      label="None"
      name="gridVisible"
      value="none"
      checked={gridVisible === 'none'}
      onChange={handleGridChange}
    />
  );
};

export default GridTypeNone;
