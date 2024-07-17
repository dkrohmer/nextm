import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { SidebarPushable, SidebarPusher } from 'semantic-ui-react';
import { useDispatch, Provider } from 'react-redux';
import Products from './components/products/Products';
import Product from './components/products/Product';
import TopBar from './components/TopBar';
import ModelEditor from './applets/model-editor/ModelEditor';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { ToastManager } from './components/ToastManager';
import store, { AppDispatch, RootState } from './store'; // Ensure this imports your configured Redux store

import {
  showToast,
  setDatabasePath,
  setGridVisible,
  setExplicitObjectSelection,
} from './store/SettingsStore'; // Adjust the import path as necessary

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.electron.getCurrentDbPath().then((currentPath: string) => {
      dispatch(setDatabasePath(currentPath));
      dispatch(
        showToast({
          promise: Promise.resolve(), // Resolve immediately since there's no async operation
          loadingMessage: '', // No loading message needed
          successMessage: `Current database: ${currentPath}`, // Success message with grid type
          errorMessage: '', // No error message needed
        }),
      );
    });
    window.electron
      .getGridType()
      .then((currentGridType: 'none' | 'dot' | 'mesh') => {
        dispatch(setGridVisible(currentGridType || 'none'));
      });
    window.electron
      .getExplicitObjectSelection()
      .then((explicitObjectSelection: boolean) => {
        dispatch(setExplicitObjectSelection(explicitObjectSelection || false));
      });
  }, []);

  return (
    <div className="app-container">
      <SidebarPushable>
        <Sidebar />
        <SidebarPusher className="sidebar-pusher">
          <ToastManager />
          <TopBar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<Product />} />
              <Route path="/products/:productId/increments" element={<Product />} />
              <Route path="/products/:productId/increments/:incrementId" element={<Product />} />
              <Route path="/products/:productId/increments/:incrementId/models" element={<Product />} />
              <Route path="/products/:productId/increments/:incrementId/models/:modelId" element={<ModelEditor />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </SidebarPusher>
      </SidebarPushable>
    </div>
  );
};

function AppWrapper() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default AppWrapper;
