import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { fetchLatestVersionThumbnail } from '../../../../renderer/services/api/versions';
import { configureStore } from '@reduxjs/toolkit';
import ModelThumbnail from '../../../../renderer/components/Model/Thumbnail';
import versionsReducer from '../../../../renderer/store/versions';
import '@testing-library/jest-dom';

const store = configureStore({
  reducer: {
    versions: versionsReducer,
  },
});

const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const mockThumbnail = 'test-file-stub';
const defaultThumbnail = 'test-file-stub';

describe('ModelThumbnail Component', () => {
  it('renders the thumbnail when loaded', () => {
    store.dispatch({
      type: fetchLatestVersionThumbnail.fulfilled.type,
      payload: mockThumbnail,
      meta: { arg: { modelId: '123' } },
    });

    renderWithRedux(<ModelThumbnail modelId="123" />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockThumbnail);
  });

  it('renders the default thumbnail when loading', () => {
    store.dispatch({
      type: fetchLatestVersionThumbnail.pending.type,
      meta: { arg: { modelId: '123' } },
    });

    renderWithRedux(<ModelThumbnail modelId="123" />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', defaultThumbnail);
  });

  it('renders the default thumbnail when there is an error', () => {
    store.dispatch({
      type: fetchLatestVersionThumbnail.rejected.type,
      payload: 'Some error',
      meta: { arg: { modelId: '123' } },
    });

    renderWithRedux(<ModelThumbnail modelId="123" />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', defaultThumbnail);
  });
});
