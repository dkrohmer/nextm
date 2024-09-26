import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import { RootState, AppDispatch } from '../../store';
import { setSidebarVisible } from '../../store/settings';
import logo from '../../../../assets/logo.svg';
import '../../styles/layout/topbar.css';

const TopBar: React.FC = () => {
  /**
   * local states
   */
  const { sidebarVisible } = useSelector((state: RootState) => state.settings);

  /**
   * hooks
   */
  const dispatch = useDispatch<AppDispatch>();

  /**
   * handlers
   */
  const handleToggleSidebar = () => {
    dispatch(setSidebarVisible(!sidebarVisible));
  };

  /**
   * tsx
   */
  return (
    <Menu inverted borderless className="topbar-menu" data-testid="topbar-menu">
      <Menu.Header
        as="div"
        className="topbar-menu-header"
        data-testid="menu-header"
      >
        <img
          src={logo}
          alt="Logo"
          className="topbar-menu-header-img"
          data-testid="menu-header-logo"
        />
      </Menu.Header>

      <Menu.Menu position="right" data-testid="topbar-menu-item">
        <Menu.Item
          onClick={handleToggleSidebar}
          className="topbar-menu-item-settings"
          data-testid="menu-settings"
        >
          <Icon name="cog" size="large" data-testid="menu-settings-icon" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default TopBar;
