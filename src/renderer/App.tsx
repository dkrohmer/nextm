import React from 'react';
import { Provider } from 'react-redux';
import { SidebarPushable, SidebarPusher } from 'semantic-ui-react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Products,
  Product,
  ModelEditor,
  SideBar,
  TopBar,
  Footer,
  ToastManager,
} from './components';
import store from './store';
import useInitializeApp from './hooks/useInitializeApp';
import './styles/app.css'

const App: React.FC = () => {
  useInitializeApp();

  return (
    <div className="app-container">
      <SidebarPushable>
        <SideBar />
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
