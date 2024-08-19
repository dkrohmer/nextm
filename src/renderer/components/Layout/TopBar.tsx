import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Menu } from "semantic-ui-react";
import { RootState, AppDispatch } from "../../store";
import { setSidebarVisible } from "../../store/settings";
import logo from "../../../../assets/logo.svg"
import "../../styles/layout/topbar.css";

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
    <>
      <Menu inverted borderless className="topbar-menu">
        {/* nexTM logo */}
        <Menu.Header as="div" className="topbar-menu-header">
          <img src={logo} alt="Logo" className="topbar-menu-header-img"/>
        </Menu.Header>
        
        {/* settings icon */}
        <Menu.Menu position="right">
          <Menu.Item onClick={handleToggleSidebar} className="topbar-menu-item-settings">
            <Icon name="cog" size="large" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default TopBar;
