import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Menu } from "semantic-ui-react";
import { RootState, AppDispatch } from "../../store";
import { setSidebarVisible } from "../../store/settings";
import logo from "../../../../assets/logo.svg"
import "../../styles/layout/topbar.css";

const TopBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { sidebarVisible } = useSelector((state: RootState) => state.settings);

  const toggleSidebar = () => {
    dispatch(setSidebarVisible(!sidebarVisible));
  };

  return (
    <>
      <Menu inverted borderless className="topbar-menu">
        {/* nexTM logo */}
        <Menu.Header as="div" className="topbar-menu-header">
          <img src={logo} alt="Logo" className="topbar-menu-header-img"/>
        </Menu.Header>
        
        {/* settings icon */}
        <Menu.Menu position="right">
          <Menu.Item onClick={toggleSidebar} className="topbar-menu-item-settings">
            <Icon name="cog" size="large" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default TopBar;
