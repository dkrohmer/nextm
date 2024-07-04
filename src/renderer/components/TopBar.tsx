// src/renderer/components/TopBar.tsx
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setSidebarVisible } from '../store/SettingsStore';

import logo from '../../../../../../../assets/logo.svg';

const TopBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // global redux states
  const { sidebarVisible } = useSelector((state: RootState) => state.settings);

  const toggleSidebar = () => {
    dispatch(setSidebarVisible(!sidebarVisible));
  };

  return (
    <>
      <Menu
        id="topbar"
        className="topbar"
        inverted
        borderless
        style={{ margin: '0px', padding: '0px', borderRadius: '0px' }}
      >
        <Menu.Header
          as="div"
          style={{ display: 'flex', alignItems: 'center', margin: '10px' }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ margin: '10px', width: '150px', padding: '0px' }}
          />
        </Menu.Header>
        <Menu.Menu position="right">
          {/* <Menu.Item onClick={handleRefresh} style={{ cursor: 'pointer' }}>
            <Icon name='refresh' size='large' />
          </Menu.Item> */}
          <Menu.Item onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
            <Icon name="cog" size="large" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      {/* <SideBar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} /> */}
    </>
  );
};

export default TopBar;
